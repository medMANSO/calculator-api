# if the scripts do not work, you might need to grant execution permisson
# chmod +x _start.sh

# deleting the container if it already exists
echo Deleting existing \'calculatorapi\' containers
docker rm calculatorapi

echo Running Docker container
# Add "-d" option to run in the background
docker run --name=calculatorapi -it --publish 5000:5000 calculatorapi