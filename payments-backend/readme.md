Payment App
------------

This app is to handle payment. It provides one endpoint which is supposed to be called from order app to confirm payment processing and get payment transaction result in return.


Payment API EndPoint :

	Method: POST
	EndPoint: http://localhost:3080/api/payment/

  	Header: {
		"Content-Type":"application/json",
		"Authorization":"Bearer 5c9884b79f0ba00f0ae9395c"
	}

  	body: {
		"order": "5c98dc6c327fa63b77054268",
		"mode": "cash",
		"amount": 338
	}


Note :
  This is for creating Mongo Database and required database user.
    
    1. use payment_solutions
    2. db.createUser({ user: "tech33", pwd: "PM47K1WAz8z28", roles: [ { role: "readWrite", db: "payment_solutions" } ] })
