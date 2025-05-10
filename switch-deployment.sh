#!/bin/bash

# Script to switch traffic between blue and green deployments

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for required argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 <blue|green>"
  exit 1
fi

ENVIRONMENT=$1

if [[ "$ENVIRONMENT" != "blue" && "$ENVIRONMENT" != "green" ]]; then
  echo "Error: Environment must be either 'blue' or 'green'"
  exit 1
fi

# Switch the service selector
echo -e "Switching traffic to ${ENVIRONMENT} environment..."

kubectl patch service blue-green-service -p "{\"spec\":{\"selector\":{\"app\":\"${ENVIRONMENT}-app\"}}}"

if [ $? -eq 0 ]; then
  if [ "$ENVIRONMENT" == "blue" ]; then
    echo -e "${BLUE}Successfully switched to BLUE environment!${NC}"
  else
    echo -e "${GREEN}Successfully switched to GREEN environment!${NC}"
  fi
  
  # Get the Load Balancer URL
  echo -e "\nApplication is now accessible at:"
  kubectl get service blue-green-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
  echo -e "\n"
else
  echo "Failed to switch environments. Check the error message above."
  exit 1
fi

# Get running pods for the active environment
echo -e "Active pods serving traffic:"
kubectl get pods -l app=${ENVIRONMENT}-app