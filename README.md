# Blue-Green Deployment with Jenkins CI/CD and AWS EKS

This project demonstrates a blue-green deployment strategy using Jenkins CI/CD pipeline and AWS EKS for a Python Flask web application. The pipeline allows selecting between blue and green deployments, with visually distinct UIs to clearly identify which version is active.

## Project Overview

![Blue-Green Deployment Architecture](https://i.ibb.co/vQF2M8Y/blue-green-deployment.png)

### Features
- **Blue-Green Deployment**: Two identical environments (blue and green) for zero-downtime deployments
- **Jenkins CI/CD Pipeline**: Parameterized build with options to deploy to blue or green environment
- **AWS EKS Integration**: Kubernetes-based deployment for scalability and reliability
- **Docker Containerization**: Application packaged as Docker containers for consistency
- **Visual Distinction**: Clear visual difference between blue and green deployments

### Application Access
- The application runs on port **5000**
- Access via: `http://<LOAD_BALANCER_IP>:5000`

## Project Structure

```
.
├── app/                      # Flask application
│   ├── static/               # Static assets (CSS, JS, images)
│   ├── templates/            # HTML templates
│   ├── blue_config.py        # Configuration for blue environment
│   ├── green_config.py       # Configuration for green environment
│   └── app.py                # Main Flask application
├── k8s/                      # Kubernetes configuration files
│   ├── blue-deployment.yaml  # Blue deployment configuration
│   ├── green-deployment.yaml # Green deployment configuration
│   └── service.yaml          # Service and load balancer configuration
├── jenkins/                  # Jenkins configuration
│   └── Jenkinsfile           # Jenkins pipeline definition
├── Dockerfile                # Docker image definition
└── README.md                 # Project documentation
```

## Setup Instructions

### Prerequisites
- AWS Account with EKS cluster configured
- Jenkins server with necessary plugins
- Docker Hub account
- kubectl configured to access your EKS cluster

### 1. EKS Cluster Setup

Ensure your EKS cluster is created:

```bash
# Verify connection to your EKS cluster
kubectl config use-context arn:aws:eks:us-east-1:ACCOUNT_ID:cluster/kastro-eks
kubectl get nodes
```

### 2. Jenkins Configuration

1. Install required Jenkins plugins:
   - Amazon EKS
   - Docker Pipeline
   - Kubernetes CLI
   - Pipeline: AWS Steps

2. Configure Jenkins credentials:
   - `docker-creds`: Docker Hub credentials
   - `aws-eks-creds`: AWS credentials for EKS access

3. Create a new Jenkins pipeline:
   - Type: Pipeline
   - Definition: Pipeline script from SCM
   - SCM: Git (provide your repository URL)
   - Script Path: jenkins/Jenkinsfile

### 3. Deployment

1. Build with Parameters:
   - Select "Build with Parameters" in Jenkins
   - Choose either "blue" or "green" for the DEPLOY_ENV parameter

2. The pipeline will:
   - Clone the repository
   - Build Docker image with the appropriate tag
   - Push the image to Docker Hub
   - Deploy to the selected environment in the EKS cluster

## CI/CD Pipeline Steps

1. **Clone Repository**: Pull the latest code from Git
2. **Build Docker Image**: Create Docker image with blue or green configuration
3. **Push Docker Image**: Push the tagged image to Docker Hub
4. **Deploy to EKS**: Apply Kubernetes configs to deploy to blue or green environment

## Blue-Green Deployment Strategy

- **Blue Environment**: Initial production environment
- **Green Environment**: New version environment

The strategy works as follows:
1. New changes are deployed to the inactive environment (blue or green)
2. Testing is performed on the inactive environment
3. When ready, traffic is switched to the newly deployed environment
4. The previous environment remains available for quick rollback if needed

## Troubleshooting

If you encounter issues:

1. Check Jenkins build logs for errors
2. Verify Kubernetes deployments: `kubectl get deployments`
3. Check pod status: `kubectl get pods`
4. View pod logs: `kubectl logs <pod-name>`

## Credits

Designed, Developed & Deployed by KASTRO