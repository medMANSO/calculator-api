# if the scripts do not work, you might need to grant execution permisson
# chmod +x _buildProject.sh

# building the project - needs to be done once on a new machine or when changes are made to the project

echo Deleting CalculatorAPI image \if it exists
docker image rm calculatorapi

echo Building Calculator-API
docker build -t calculatorapi .