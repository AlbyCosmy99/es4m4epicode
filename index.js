window.onload = function() {
    fetch('https://striveschool-api.herokuapp.com/books')
    .then(res => res.json())
    .then(data => {
        let parent = document.querySelector('.acquista .container .row')
        let c = 'ciao'
        parent.innerHTML += data.map(elem => {
            return `
            <div class="elems-container col-6 col-sm-4">
                <img src="${elem.img}" style="width: 50%;margin:0.2rem;user-select: none;" alt="${elem.title}"/>
                <div class="details-container">
                    <h6 style="user-select: none;">${elem.title}</h6>
                    <span style="margin-top:0.5rem;user-select: none;">$${elem.price}</span>
                    <svg onclick="add('${elem.asin}', '${elem.title}', '${elem.img}','${elem.price}')" class="text-success" style="margin-top: 1rem;cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </div>
            </div>
            `
        }).join('')
    })

    updateCart()
}


function updateCart() {
    let carrello = document.querySelector('.carrello')
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
    if(!cart || cart.length === 0) {
        carrello.innerHTML = `
        <h5 style="text-align: center;margin-top:5rem">EMPTY CART</h5>
        `
    }
    else {
        carrello.innerHTML = cart.map(elem => {
            return `
            <div class="card col-12 mt-2">
                <div class="card-body">
                    <div class="cart-container">
                        <div class="cart-container1">
                        <img style="width:3rem;cursor: pointer;" src='${elem.img}' onclick="window.location.href = '/dettagli/dettagli.html?id=${elem.id}'"/>
                        <h6 >${elem.title}</h6>
                        </div>
                        <div class="cart-container2">
                        <span>$${elem.price}</span>
                        <span>Quantity: <b> ${elem.quantity}</b></span>
                        <svg onclick="deleteElem('${elem.id}')" class="text-danger" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
                            <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('')
    }

    document.querySelector('.purchases').innerHTML = countQuantity(cart)
    
}

function isPresent(arr, id) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === id) {
            return true
        }
    }
    return false
}

function getObjById(arr,id) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === id) {
            return arr[i]
        }
    }
    return null
}

function getIndexById(arr, id) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === id) {
            return i
        }
    }
    return -1
}

function countQuantity(cart) {
    let quantity = 0;
    if(!cart) {
        return quantity;
    }
    for(let i=0;i<cart.length;i++) {
        quantity += cart[i].quantity
    }
    return quantity
}

function add(id,title,img,price) {
    if(!localStorage.getItem('cart')) {
        let cart = []
        cart[0] = {
            'id':id,
            'title': title,
            'img': img,
            'price': price,
            'quantity': 1
        }

        localStorage.setItem('cart',JSON.stringify(cart))
    }
    else if(!isPresent(JSON.parse(localStorage.getItem('cart')),id)) 
    {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[cart.length] = {
            'id':id,
            'title': title,
            'img': img,
            'price': price,
            'quantity': 1
        }

        localStorage.setItem('cart',JSON.stringify(cart))
    }
    else {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[getIndexById(cart,id)] = {
            'id':id,
            'title': title,
            'img': img,
            'price': price,
            'quantity': getObjById(cart,id).quantity + 1
        }

        localStorage.setItem('cart',JSON.stringify(cart))
    }

    updateCart()
}

function deleteElem(id) {
    cart = JSON.parse(localStorage.getItem('cart'))
    let index = getIndexById(cart,id)
    if(cart[index].quantity === 1) {
        cart = cart.splice(0, index).concat(cart.splice(index+1,cart.length))
    }
    else {
        cart[index].quantity = cart[index].quantity - 1
    }
    
    localStorage.setItem('cart',JSON.stringify(cart))
    updateCart()
}

function emptyCart() {
    localStorage.setItem('cart',JSON.stringify([]))
    updateCart()
}