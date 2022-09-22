# if the scripts do not work, you might need to grant execution permisson
# chmod +x _stop.sh

echo Stopping CalculatorAPI container
docker stop calculatorapi

echo Deleting CalculatorAPI container
docker rm calculatorapi