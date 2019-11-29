window.addEventListener('load', function(){

    var btnsAdd = document.querySelectorAll('.product__anadir');
    var cartCant = document.querySelector('.cart__cant');

    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');
            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cartCant.innerText = data.cartLength;
                });

                window.location.reload();


        });

    });

});