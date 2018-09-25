

function runTableQuery() {
    var currentURL = window.location.origin;

    $.ajax({ url: currentURL + "/api/tables", method: "GET" })
        .then(function (tableData) {

            console.log("------------------------------------");
            console.log("URL: " + currentURL + "/api/tables");
            console.log("------------------------------------");


            var rowNumber = 1
            var colNumber = 1
        
            for (var i = 0; i < tableData.length; i++) {

                if (i % 3 === 0) {
                    var tableSection = $("<div>");
                    tableSection.addClass("row");
                    tableSection.attr("id", "row-" + rowNumber);
                    $(".container").append(tableSection);
                    rowNumber++
                }

                $('#row-' + (Math.floor(i / 3) + 1)).append(
                    `<div class='col s4'>
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text" >
                                        <span class="card-title" data-productID = ${tableData[i].item_id} >${tableData[i].product_name}</span>
                                        <p> Price : $${tableData[i].price}</p>
                                        <p id = "${tableData[i].item_id}"> In stock : ${tableData[i].stock_quantity}</p>
                                    </div>
                        </div>
                    </div>`)
            }
        });

        
}
runTableQuery()


$("#submit").on("click", function (event) {
    event.preventDefault();

    var product = $("#product").val().trim()

    console.log($(`span:contains(${product})`).data('productid'))

    // Here we grab the form elements
    var newOrder = {
        productID: $(`span:contains(${product})`).data('productid'),
        amount: $("#amount").val().trim(),
    };



    $.post("/api/order", newOrder,
        function (data) {
        if( newOrder.amount > data[0].stock_quantity){
            alert(`Please select a value less than or equal to ${data[0].stock_quantity} to complete your order!`)
        }
        else if (newOrder.amount <= 0){
            alert('Please select an Amount greater than 0!')
        }
        else{

            $(`#${data[0].item_id}`).text(`In stock : ${parseInt(data[0].stock_quantity)-parseInt(newOrder.amount)}`)
           alert(`You bought ${newOrder.amount} ${product}`)
        }



        }

    )


 

})
