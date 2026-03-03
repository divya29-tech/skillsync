// =============================
// ACTIVE NAVBAR
// =============================
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// =============================
// AUTO SUGGEST FEATURE
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const locationSelect = document.getElementById("location");
    const suggestionDiv = document.getElementById("suggestion");

    const highDemandPlaces = {

    "Ariyalur": ["Tailoring", "Pickle Making"],
    "Perambalur": ["Masala Powder", "Embroidery"],
    "Theni": ["Mushroom Cultivation", "Organic Vegetable Selling"],
    "Dharmapuri": ["Millet Products", "Poultry Farming"],
    "Madurai": ["Flower Garland Making", "Pickle Making"],
    "Salem": ["Handloom Weaving", "Millet Products"],
    "Coimbatore": ["Tailoring", "Bakery Items", "Masala Powder"],
    "Chennai": ["Graphic Designing", "Data Entry", "Mobile Repair"],
    "Trichy": ["Dairy Products", "Soap Making"],
    "Erode": ["Detergent Powder", "Masala Powder"],
    "Dindigul": ["Bakery Items", "Tailoring"],
    "Karur": ["Handloom Weaving", "Paper Bag Making"],
    "Namakkal": ["Poultry Farming", "Dairy Products"],
    "Villupuram": ["Agarbatti Making", "Leaf Plate Making"],
    "Sivagangai": ["Pickle Making", "Millet Products"],
    "Ramanathapuram": ["Fish Processing", "Dry Fish Selling"],
    "Thanjavur": ["Handicraft Making", "Flower Garland Making"],
    "Nagapattinam": ["Seafood Processing", "Pickle Making"]

};

    locationSelect.addEventListener("change", function () {

        const selectedLocation = this.value;

        if (highDemandPlaces[selectedLocation]) {
            suggestionDiv.innerHTML =
                "🔥 High Demand Skills in " +
                selectedLocation +
                ": " +
                highDemandPlaces[selectedLocation].join(", ");
        } else {
            suggestionDiv.innerHTML = "";
        }

    });

});


// =============================
// SKILL MATCH (USING JSON DATABASE)
// =============================
async function checkOpportunity() {

    const location = document.getElementById("location").value;
    const skill = document.getElementById("skill").value;
    const level = document.getElementById("skillLevel").value;
    const resultDiv = document.getElementById("result");

    try {

        // Fetch data from JSON database
        const response = await fetch("data.json");
        const data = await response.json();

        // Find selected skill
        const selectedSkill = data.skills.find(s => s.name === skill);

        if (!selectedSkill) {
            resultDiv.innerHTML = "Skill not found in database.";
            return;
        }

        // Calculate level bonus
        let levelBonus =
            level === "Advanced" ? 12000 :
            level === "Intermediate" ? 6000 : 0;

        const finalIncome = selectedSkill.baseIncome + levelBonus;

        // Display result
        resultDiv.innerHTML = `
            <h3>Opportunity Details (From Database)</h3>
            <p><b>Location:</b> ${location}</p>
            <p><b>Skill:</b> ${skill}</p>
            <p><b>Sell Products At:</b> ${selectedSkill.sell}</p>
            <p><b>Estimated Monthly Income:</b> ₹${finalIncome}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "Error loading database.";
        console.error("Database error:", error);
    }
}