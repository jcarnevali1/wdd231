const spotlights = document.querySelector('#spotlights');

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error("Failed to fetch business data.");
        }

        const data = await response.json();
        displaySpotlights(data);

    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(data) {
    spotlights.innerHTML = "";

    const members = data.filter(business =>
        business.membership == 2 || business.membership == 3
    );

    members.sort(() => Math.random() - 0.5);

    members.slice(0, 3).forEach(business => {
        const card = document.createElement("div");
        const businessInfo = document.createElement("div");
        const name = document.createElement("h2");
        const tagline = document.createElement("p");
        const cardInfo = document.createElement("div");
        const image = document.createElement("img");
        const cardDetails = document.createElement("div");
        const email = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("p");
        const membership = document.createElement("p");

        card.classList.add("business-card");
        businessInfo.classList.add("business-info");
        cardInfo.classList.add("card-info");
        cardDetails.classList.add("card-details");

        name.textContent = business.name;
        tagline.textContent = business.tagline;
        image.setAttribute("src", `images/${business.image}`);
        image.setAttribute("alt", `${business.name} Logo`);
        image.setAttribute("loading", "lazy");
        email.textContent = business.email;
        phone.textContent = business.phone;
        website.textContent = business.website;

        let membershipLevel;

        switch (business.membership) {
            case 2:
                membershipLevel = "Silver";
                break;
            case 3:
                membershipLevel = "Gold";
                break;
            default:
                membershipLevel = "Unknown";
        }

        membership.textContent = `Membership: ${membershipLevel}`;

        businessInfo.appendChild(name);
        businessInfo.appendChild(tagline);
        cardDetails.appendChild(email);
        cardDetails.appendChild(phone);
        cardDetails.appendChild(website);
        cardDetails.appendChild(membership);
        cardInfo.appendChild(image);
        cardInfo.appendChild(cardDetails);
        card.appendChild(businessInfo);
        card.appendChild(cardInfo);
        spotlights.appendChild(card);
    });
}

getSpotlights();