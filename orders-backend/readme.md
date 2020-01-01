Order App
------------

This app is to handle order. It provides three endpoints:
1. Create Order
2. Cancel Order
3. Check Order Status

---------------------------------------------------------

Create Order EndPoint:

	Method: POST
	EndPoint: http://localhost:3000/api/order/
	Header: {
		"Content-Type":"application/json",
		"Authorization":"Bearer 5c9884b79f0ba00f0ae9395c"
	}

	body: {
		"user": "5c9884b79f0ba00f0ae9395c",
    "deliveryAddress": "Somewhere in Lucknow",
    "items": [
      {
        "product": "5c9888399f0ba00f0ae9395d",
        "quantity": "5",
        "price": "290"
      },
      {
        "product": "5c9888399f0ba00f0ae9395e",
        "quantity": "10",
        "price": "48"
      }
    ]
	}


---------------------------------------------------------

Cancel Order EndPoint

	Method: PUT
	EndPoint: http://localhost:3000/api/order/<orderId>
	Header: {
		"Content-Type":"application/json",
		"Authorization":"Bearer 5c9884b79f0ba00f0ae9395c"
	}

  	body: {
		"orderState": "cancelled"
	}


---------------------------------------------------------

Check Order Status EndPoint

	Method: GET
	EndPoint: http://localhost:3000/api/order/<orderId>
	Header: {
		"Content-Type":"application/json",
		"Authorization":"Bearer 5c9884b79f0ba00f0ae9395c"
	}


---------------------------------------------------------



  Note :
    This is for creating Mongo Database and required database user. Also a dummy user and some products to be used for order endpoints.

    1. use order_solutions
    2. db.createUser({ user: "tech33", pwd: "PM47K1WAz8z28", roles: [ { role: "readWrite", db: "order_solutions" } ] })
    3. db.users.insertOne(
      { fullName: "Mukesh Kr. Pandey", email: "mukesh@technologies33.com", password: "$2a$10$/lEEg10SLIJuRqG4y7.aK.ePIiYN97K87qJElUoNIB.LIlCWRK3DK", status: "active" }
    )
    4. db.products.insertMany([
      { title: "Digital Light Sensor - BH1750FVI V2.0", description: "Digital Light sensor", price: "290", available: true, status: "active" },
      { title: "10 Way 2.54MM DIP switch R/A Piano Type", description: "DIP switch R/A Piano Type", price: "48", available: true, status: "active" },
      { title: "Quick Cable Connector - 2 Way", description: "Quick Cable Connector - 2 Way", price: "6", available: true, status: "active" },
      { title: "Good-Day", description: "Biscuit", price: "20", available: true, status: "active" },
      { title: "Web Development Using Sql", description: "Book for smart students", price: "2399", available: true, status: "active" },
      { title: "Honor 6x", description: "A brand new model of Huawai", price: "13200", available: true, status: "active" }
    ])
