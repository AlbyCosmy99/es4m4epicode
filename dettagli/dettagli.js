window.onload = function() {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    fetch(`https://striveschool-api.herokuapp.com/books?asin=${id}`)
    .then(res => res.json())
    .then(data => {
        if(data && data.length>0) {
            document.querySelector('.title').innerHTML = data[0].title
        }
        else {
            let error = document.querySelector('.title')
            error.innerHTML = 'ERROR WHILE RETRIVING BOOK TITLE'
            error.className = 'text-danger'
        }   
    })
    .catch(err => {
        console.log(err)
    })
}