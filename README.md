# ሰራተኛ API ምሳሌ /Mock Employee API

ይህ ፕሮጀክት ምሳሌ ለሰራተኞች ዳታቤዝ የሚያስተዳድር በጣም ቀላል የሆነ API አገልጋይ ይዟል።\

ይህ ቀላል የAPI አገልጋይ ምሳሌ ለዩቲዩብ ቻናል, [EthioSilverApps](https://www.youtube.com/@ethiosilverapps), ለAWS API Gateway መሳሪያ ሆኖ እንዲያገለግል የታሰበ ነው።\

This project contains a very simple API Server that will manage a mock employee database.\

This API Server example is intended to be used as an instrument for AWS API Gateway tutorial on Youtube channel [EthioSilverApps](https://www.youtube.com/@ethiosilverapps).\

## ቅድመ-ሁኔታዎች/Prerequisites

- ጫን/Install [Node.js](https://nodejs.org/en/download/)

## ድህረገፅ መጀመር/Running the Server

- የሚከተለውን ትዕዛዝ ይተይቡ/Run the following command `npm install`
- የሚከተለውን ትዕዛዝ ይተይቡ/Run the following command `node app.js`
- ከዚያም ይህንን መልእክት ታያለህ/Then, you should see `Node Server Listening on port 8080` log.

## Available API Endpoints

- `GET: /employees` :- ሁሉንም የሰራተኞች መረጃ ሰርስሮ ያወጣል / Retrieves all employee data.
- `POST: /employee` (with JSON body {firstName, lastName, jobTitle}) :- ሰራተኛ ይጨምራል / Adds employee.
- `DELETE: /employee?id={employee-id}` :- የሰራተኛ ID ከተሰጠው በኋላ የሰራተኛውን መረጃ ያስወግደዋል። / Given the employee id, it will delete that employee's data.
