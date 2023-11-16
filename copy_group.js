const API_KEY = "//o/WtrfClWgGRLsSZ+85A==8k6MiGtksnlsvG5G";
const EXCHANGE_RATE_API = "https://api.api-ninjas.com/v1/exchangerate";

let exchangeRates = {};
const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // One day in milliseconds
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000; // One hour in milliseconds


function generateCode() {  
  const currentDate = new Date();  
  const year = String(currentDate.getFullYear()).slice(-2);  
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');  
  const day = String(currentDate.getDate()).padStart(2, '0');  
  const hour = String(currentDate.getHours()).padStart(2, '0');  
  const minute = String(currentDate.getMinutes()).padStart(2, '0');  
  const seconde = String(currentDate.getSeconds()).padStart(2, '0');  
    
  const code = `#${seconde}M${hour}A${minute}D${year}S${month}Z${day}`;  
    
  return code;  
}  








// Function to show a notification with a message, title, and icon
function showNotification(message, title, isError) {
    const notificationContainer = document.getElementById(
        "notification-container"
    );
    const notification = document.getElementById("notification");

    // Set the title and text content based on isError
    notification.querySelector(".notification-title").textContent = title;
    notification.querySelector(".notification-text").textContent = message;

    // Set the icon class based on success or error
    const icon = notification.querySelector(".notification-icon-div");
    icon.className = "notification-icon-div";

    if (isError) {
        icon.classList.add("fa-solid", "fa-circle-exclamation");
    } else {
        icon.classList.add("fa-solid", "fa-circle-check");
    }

    // Set the background color based on success or error
    notification.style.backgroundColor = isError ? "#FF5733" : "#4CAF50";

    // Show the notification container
    notificationContainer.style.display = "block";

    // Automatically hide the notification after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

// Function to hide the notification
function hideNotification() {
    const notificationContainer = document.getElementById(
        "notification-container"
    );
    notificationContainer.style.display = "none";
}

// Function to close the notification
function closeNotification() {
    hideNotification();
}

// Event listener for the close icon
const closeIcon = document.querySelector(".notification-close");
closeIcon.addEventListener("click", closeNotification);






// Function to update conversion as you type
function updateConversion() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    const resultDivs = document.querySelectorAll(".copy");
    const conversionSentence = document.getElementById("conversionSentence");
    const groupprice = document.getElementById("groupprice");
    if (!isNaN(amount) && amount > 0) {
    conversionSentence.style.display = "block";
    groupprice.style.display = "block";
} else {
    conversionSentence.style.display = "none";
    groupprice.style.display = "none";
}
    if (!isNaN(amount) && amount > 0) {
        resultDivs.forEach((div) => {
            div.style.display = "block";
        });
        for (const currency in exchangeRates) {
            const convertedAmount = amount * exchangeRates[currency];
            const decimalPlaces = currency === "GNF" ? 0 : 1;
            var currentCurrency = document.getElementById(
                `amountIn${currency.toLocaleUpperCase}`
            );
            currentCurrency = `${convertedAmount.toFixed(
                decimalPlaces
            )} ${currency}`;
        }

        // Format the converted values in French currency format
        const cnyValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "CNY",
            maximumFractionDigits: 2,
        }).format(amount);
        const gnfValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "GNF",
            maximumFractionDigits: 0,
        }).format(amount * exchangeRates.GNF);
        const xofValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "XOF",
            maximumFractionDigits: 0,
        }).format(amount * exchangeRates.XOF);
        const usdValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(amount * exchangeRates.USD);
        const eurValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
        }).format(amount * exchangeRates.EUR);

        document.getElementById("eurResult").textContent = eurValue;
        document.getElementById("gnfResult").textContent = gnfValue;
        document.getElementById("xofResult").textContent = xofValue;
        document.getElementById("usdResult").textContent = usdValue;

        // PRICE COPY
        // Add a click event listener to copy the sentence to the clipboard
        conversionSentence.addEventListener("click", () => {
            var text = `${cnyValue} ou ${gnfValue} ou ${xofValue} ou ${usdValue}`;
            const textToCopy = text;
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            showNotification("Text copied to clipboard", "Success");
        });



        // Add a click event listener to copy the sentence to the clipboard
        groupprice.addEventListener("click", () => {
            var text = `👆*${generateCode()}*👆 
*Minimum:* 10 PCS 
*Prix Unitaire:* ${cnyValue} ou ${gnfValue} ou ${xofValue} ou ${usdValue}  
*WhatsApp:* +8618354919286`;
            const textToCopygroupprice = text;
            const textAreagroupprice = document.createElement("textarea");
            textAreagroupprice.value = textToCopygroupprice;
            document.body.appendChild(textAreagroupprice);
            textAreagroupprice.select();
            document.execCommand("copy");
            document.body.removeChild(textAreagroupprice);
            showNotification("Text copied to clipboard", "Success");
        });
    } else {
        resultDivs.forEach((div) => {
            div.style.display = "none";
        });
        document.getElementById("eurResult").textContent = "0 EUR";
        document.getElementById("gnfResult").textContent = "0 GNF";
        document.getElementById("xofResult").textContent = "0 XOF";
        document.getElementById("usdResult").textContent = "0 USD";
    }
}


