pipeline {
    agent any

    environment {
        EC2_HOST = '3.111.252.209'
        EC2_USER = 'ubuntu'
        EC2_KEY = '/var/jenkins_home/.ssh/id_rsa'
    }

    stages {
        stage('Deploy') {
            steps {
                sh '''
                    ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                        cd ~/ecommerce
                        git pull origin main
                        docker compose up -d --build frontend
                        echo 'Frontend deployment completed successfully'
                    "
                '''
            }
        }
    }

    post {
        always {
            deleteDir()
        }
        success {
            echo 'Pipeline succeeded! Frontend deployed to EC2'
        }
        failure {
            echo 'Pipeline failed! Check logs for details'
        }
    }
}
