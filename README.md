# Coupon code Backend
To View this in action go to [couponas.herokuapp.com](https://couponas.herokuapp.com/)

To run this in your local machine follow these steps:
+ Run below commands
    ```bash
    # Clone from my repository
    git clone https://github.com/jayeshkr77/couponbackend.git
    cd couponbackend
   ```
+ Create an atlas account (Free MongoDB database). [How to create a free account?](https://studio3t.com/knowledge-base/articles/mongodb-atlas-tutorial/) and create a database through the dashboard.

+ create **.env** file in the same directory where you package.json lies.

+ update .env file with you mongoDB connection string
    ```
    MONGODB_URL= <Your connection string>
    ```
+ Execute the below commands
    ```bash
    # You will need nodeJS installed on you system
    # To install the dependencies
    npm install

    # To start the react app
    npm start
    ```

Sample API cURL requests
+ Create a coupon
    ```bash
    curl --location --request POST 'https://couponas.herokuapp.com/api/coupon' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "couponCode":"RNC100",
        "amount": 100,
        "startDate": "2021-12-21T20:27:53.738Z",
        "endDate": "2021-12-21T20:36:00.720Z",
        "MinimumPurchaseAmount": 500,
        "MaximumDiscountAmount": null,
        "type": "Flat"
    }'
    ```
+ Get All coupon codes
    ```bash
    curl --location --request GET 'https://couponas.herokuapp.com/api/coupon'
    ```
+ To apply a coupon on your cart
    ```bash
    curl --location --request POST 'https://couponas.herokuapp.com/api/coupon/apply' \
    --header 'Content-Type: application/json' \
    --data-raw '{
                "cart": 300,
                "couponCode": "CHRIS60"
            }'
    ```

