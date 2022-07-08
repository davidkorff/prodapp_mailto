div = document.getElementById("btnIntervene").parentNode
button = createPageElement("button", "contact_button", ["btn", "btn-warning", "btn-danger"], [], div)


button.innerHTML = "Contact Support"
// button.setAttribute("onclick",merchantEmail())
// button.addEventListener("click", merchantEmail)
button.onclick = function(){
  orderObject = JSON.parse(document.getElementById('pnlOrderLineContent').querySelector('input').value)
  var toEmailArray =[]
  var subject = ""
  var body = ""
  var modal = document.getElementById("mdlInteractive")

  // modal.setAttribute("aria-modal", "true" )
  // modal.setAttribute("aria-hidden", "false" )

  var contactHeader = modal.querySelector(".modal-header").querySelector("h5")
  contactHeader.innerHTML = "Contact"

  var contactBody = modal.querySelector(".modal-body").querySelector("#mdlContent")
  while (contactBody.firstChild) {
        contactBody.removeChild(contactBody.firstChild);
    }
  // contactBody.innerHTML = "Contact"

  var shippingErrorButton = createPageElement("button", "shippingErrorButton", ["btn", "btan-warning", "btn-danger", "m-1"], [], contactBody)
  shippingErrorButton.innerHTML = "Shipping Error"
  shippingErrorButton.onclick = function(){
      toEmailArray =[]
      toEmailArray.push(assignMerchantemail())
      subject = "shipping error"
      createEmail(subject, toEmailArray, body)
    }

  var artWorkPoorQuality = createPageElement("button", "artWorkPoorQuality", ["btn", "btn-warning", "btn-danger", "m-1"], [], contactBody)
  artWorkPoorQuality.innerHTML = "Poor Artwork"
  artWorkPoorQuality.onclick = function(){
    toEmailArray =[]
    toEmailArray.push("ahellein@pcna.com")
    subject = "Poor Quality artwork"
    createEmail(subject, toEmailArray, body)
  }

  var artWorkIncorrect = createPageElement("button", "artWorkIncorrect", ["btn", "btn-warning", "btn-danger", "m-1"], [], contactBody)
  artWorkIncorrect.innerHTML = "Artwork Incorrect"
  artWorkIncorrect.onclick = function(){
    toEmailArray =[]
    toEmailArray.push("dkorff@pcna.com")
    toEmailArray.push("ahellein@pcna.com")
    subject = "Incorrect Artwork"
    createEmail(subject, toEmailArray, body)
  }


  var needDev = createPageElement("button", "needDev", ["btn", "btn-warning", "btn-danger", "m-1"], [], contactBody)
  needDev.innerHTML = "Need Dev"
  needDev.onclick = function(){
    toEmailArray =[]
    toEmailArray.push("ahellein@pcna.com")
    subject = "Need Dev"
    createEmail(subject, toEmailArray, body)
  }


  var needBusiness = createPageElement("button", "needBusiness", ["btn", "btn-warning", "btn-danger", "m-1"], [], contactBody)
  needBusiness.innerHTML = "Busines Question"
  needBusiness.onclick = function(){
    toEmailArray =[]
    toEmailArray.push("dkorff@pcna.com")
    subject = "Need Business"
    createEmail(subject, toEmailArray, body)
  }




  $('#mdlInteractive').modal('show');


  function assignMerchantemail(){
    var prefix = $(":contains('Order Number:')").last()[0].parentNode.childNodes[3].innerHTML.substring(0, 3)
    if(prefix === 'PR-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'RO-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'ZA-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'KX-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'MO-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'CG-'){
      return toEmail = 'dkorff@pcna.com'
    }
    else if(prefix == 'BSN'){
      return toEmail = 'dkorff@pcna.com'
    }
    else{
      return toEmail = 'dkorff@pcna.com'
    }
  }

  // window.open("mailto:"+toEmail+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody)
  // location.href = "mailto:"+toEmail+'?cc='+'dkorff@pcna.com'+'&subject='+'error with order'+'&body='+`Issue With Order ${document.getElementById('pnlOrderLineContent').querySelector('input').value}` ;
};
// button.onclick = merchantEmail;

div.appendChild(button)

function createEmail(subject, toEmailArray, body){
  var emailString = ""
  var spokeOrderNum = document.querySelector(".content-area").children[2].children[1].innerHTML
  var licensePlates = ""
  var orderStatus = orderObject.lineStatus
  var artImages = ""
  var previewImages = ""
  var sku = orderObject.sku
  var tracking = orderObject.trackingNumber
  var trackingURL = orderObject.trackingURL
  var orderID = ""
  var orderLineID = ""
  var error = String(document.querySelector("#mdlErrorMessage").innerHTML.replaceAll(/<[^>]*>/g, '').replaceAll("\r", '').replaceAll("\n", '').replaceAll("     ", ''))


  for (var i = 0; i < toEmailArray.length; i++) {
    emailString = emailString+toEmailArray[i]+";"
  }
  console.log(emailString)
  console.log(body)


  licensePlateArray = orderObject.licensePlates
  for (var i = 0; i < licensePlateArray.length; i++) {
    licensePlates = licensePlates+licensePlateArray[i].id+", "
    orderID = licensePlateArray[i].orderID
    orderLineID = licensePlateArray[i].orderLineID
  }

  subject = subject + ": " + spokeOrderNum+" / "+orderID+" / "+orderLineID+" / "+licensePlates

  artImages = JSON.stringify(orderObject.artImages)
  previewImages = JSON.stringify(orderObject.previewImages)

  body = "License Plate: "+licensePlates+"%0D%0A%0D%0A"+
    "Status: "+orderStatus+"%0D%0A%0D%0A"+
    "Art Images:"+"%0D%0A"+artImages+"%0D%0A%0D%0A"+
    "Preview Images: "+"%0D%0A"+previewImages+"%0D%0A%0D%0A"+
    "SKU: "+sku+"%0D%0A%0D%0A"+
    "Tracking: "+tracking+"%0D%0A%0D%0A"+
    "Tracking URL: "+trackingURL+"%0D%0A%0D%0A"+
    "Error Message: " +"a biggy "+"%0D%0A%0D%0A"


  location.href = "mailto:"+emailString+'?cc='+'dkorff@pcna.com'+'&subject='+subject+'&body='+body ;
}

function merchantEmail(){
  console.log('yes')
}
function createPageElement(elementType, elementName, elementClasses,customAttributeArray, parentElement){
  var newElement = document.createElement(elementType)
  // newElement.setAttribute("id", elementID)
  newElement.setAttribute("name", elementName )


  for (var i = 0; i < elementClasses.length; i++) {
    newElement.classList.add(elementClasses[i])
  }

  for (var i = 0; i < customAttributeArray.length; i++) {
    let attribute = Object.keys(customAttributeArray[i])
    newElement.setAttribute(attribute, customAttributeArray[i][attribute] )
  }

  parentElement.appendChild(newElement)

  return newElement
}
