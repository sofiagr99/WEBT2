window.addEventListener('load', function(){
    
    var btnDelete = document.querySelectorAll('.product__delete');
    var total = document.querySelector('.totalCount__total');
    
    var promise = fetch('/api/cartTotal', { method: 'POST' });
    promise
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        total.innerText = ""+data.total;
    });
    
    btnDelete.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            
            event.preventDefault();
            var id = btn.getAttribute('data-name');
            
            var promise = fetch('/api/cartDelete/' + id, { method: 'POST' });
            promise
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                total.innerHTML=data.total;
            });
            
            window.location.reload();
            
        });
        
    });
    
    
    
});