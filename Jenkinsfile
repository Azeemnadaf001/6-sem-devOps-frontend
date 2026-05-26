pipeline {
    agent any

    environment {
        EC2_HOST = '3.111.252.209'
        EC2_USER = 'ubuntu'
        EC2_KEY = '/var/jenkins_home/.ssh/id_rsa'
        DEPLOYMENT_DIR = '/home/ubuntu/ecommerce'
        REPO_URL = 'https://github.com/Azeemnadaf001/6-sem-devOps-frontend.git'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh '''
                        # Deploy with proper error handling
                        ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << 'EOF'
                            set -e  # Exit on any error
                            
                            echo "=== Starting frontend deployment ==="
                            
                            # Clean up old deployment
                            if [ -d ${DEPLOYMENT_DIR} ]; then
                                echo "Removing old deployment..."
                                rm -rf ${DEPLOYMENT_DIR}
                            fi
                            
                            # Clone repository
                            echo "Cloning repository from ${REPO_URL}..."
                            git clone ${REPO_URL} ${DEPLOYMENT_DIR}
                            
                            cd ${DEPLOYMENT_DIR}
                            
                            # Verify docker-compose.yml exists
                            if [ ! -f docker-compose.yml ]; then
                                echo "ERROR: docker-compose.yml not found in cloned repo!"
                                ls -la
                                exit 1
                            fi
                            
                            echo "Found docker-compose.yml ✓"
                            
                            # Stop old container if running
                            echo "Stopping old frontend container..."
                            docker compose down frontend || true
                            
                            # Build and deploy
                            echo "Building and deploying frontend..."
                            docker compose up -d --build frontend
                            
                            # Wait for container to be ready
                            echo "Waiting for frontend to be ready..."
                            sleep 5
                            
                            # Verify deployment
                            if docker ps | grep -q frontend; then
                                echo "✓ Frontend container is running"
                                docker ps | grep frontend
                            else
                                echo "ERROR: Frontend container failed to start!"
                                docker compose logs frontend || true
                                exit 1
                            fi
                            
                            # Health check
                            echo "Performing health check..."
                            if wget -q --tries=2 http://localhost/ -O /dev/null 2>&1; then
                                echo "✓ Frontend is responding to HTTP requests"
                            else
                                echo "WARNING: Frontend health check failed, but container is running"
                                echo "Waiting additional 5 seconds..."
                                sleep 5
                            fi
                            
                            echo "=== Deployment completed successfully ==="
EOF
                    '''
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
        success {
            sh '''
                ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                    echo '✓ Frontend deployment successful'
                    docker ps | grep frontend || true
                    curl -s http://localhost/ | head -20
                " || true
            '''
            echo '✓ Pipeline succeeded! Frontend deployed to EC2'
        }
        failure {
            sh '''
                ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                    echo '=== Deployment Failed - Debugging Info ==='
                    echo 'Docker Compose Logs:'
                    docker compose logs frontend 2>&1 | tail -30 || true
                    echo ''
                    echo 'Running Containers:'
                    docker ps -a || true
                    echo ''
                    echo 'Directory Contents:'
                    ls -la ${DEPLOYMENT_DIR}/ || true
                " || true
            '''
            echo '✗ Pipeline failed! Check logs above for details'
        }
    }
}
