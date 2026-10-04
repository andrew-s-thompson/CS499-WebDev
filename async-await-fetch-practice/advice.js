export default function getPackingAdvice(tempC) {
    if (tempC < 5) {
        return "Heavy coat";
    }
    else if (tempC < 20) {
        return "Light jacket";
    }
    else {
        return "T-shirt and sunscreen";
    }
}