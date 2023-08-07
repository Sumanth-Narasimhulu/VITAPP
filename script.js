const events = [
    // ... (event objects as before) ...
    {
        name: "VTAPP Designathon 2k22",
        imageSrc: "card1.png",
        cost: 1000,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
    {
        name: "VTAPP Hackathon 2k22",
        imageSrc: "card2.png",
        cost: 2000,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
    {
        name: "VITAPP Ideathon 2k22",
        imageSrc: "card1.png",
        cost: 500,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
    {
        name: "VITAPP DSP MARATHON 2k22",
        imageSrc: "card2.png",
        cost: 600,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
    {
        name: "VITAPP Sports 2k22",
        imageSrc: "card1.png",
        cost: 40000,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
    {
        name: "VITAPP Rally 2k22",
        imageSrc: "card2.png",
        cost: 400,
        text: "Workshop on User Interface and User Experience (UI/UX) & Design models",
    },
];

function createEventCard(event) {
    // const col_1=document.createElement("div");
    // col_1.classList.add("col-sm-1")
    // const col_12=document.createElement("div");
    // col_12.classList.add("col-sm-1");
    
    const card = document.createElement("div");
    card.classList.add("col-sm-12","col-md-6"); // Add Bootstrap grid class

    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "mb-4", "h-100", "p-2", "rounded-5", "border","text-bg-dark");

    const image = document.createElement("img");
    image.src = event.imageSrc;
    image.classList.add("card-img-top", "ratio", "ratio-4x3", "img-fluid", "p-2", "rounded"); // Bootstrap aspect ratio classes
    cardInner.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const eventName = document.createElement("h5");
    eventName.classList.add("card-title");
    eventName.textContent = event.name;
    cardBody.appendChild(eventName);
    const cardcontent = document.createElement("p");
    cardcontent.textContent = event.text;
    cardBody.appendChild(cardcontent);

    const cost = document.createElement("b");
    cost.classList.add("card-text", "font-weight-bold");
    cost.textContent = "Entree Fee" + `Cost: $${event.cost}`;
    const cardfooter = document.createElement("div");
    cardfooter.classList.add("card-footer", "text-center")
    const cfbtn = document.createElement("button");
    cfbtn.classList.add("btn", "btn-lg", "rounded-5", "text-light");
    cfbtn.style.borderBottomColor = "white";
    cfbtn.style.borderTopColor = "blueviolet";
    cfbtn.style.borderLeftColor = "white";
    cfbtn.style.borderRightColor = "blueviolet";
    cfbtn.textContent="Register Now"
    cardfooter.appendChild(cfbtn);
    cardBody.appendChild(cost);

    cardInner.appendChild(cardBody);
    cardInner.appendChild(cardfooter)
    card.appendChild(cardInner);
    

    return card;
}

function searchEvents(query) {
    return events.filter((event) => event.name.toLowerCase().includes(query.toLowerCase()));
}

function updateCardDisplay(filteredEvents) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (filteredEvents.length === 0) {
        cardContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    filteredEvents.forEach((event) => {
        const card = createEventCard(event);
        cardContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort-select");
    const searchInput = document.getElementById("search-input");

    sortSelect.addEventListener("change", () => {
        const sortValue = sortSelect.value;
        let sortedEvents = [];

        if (sortValue === "lowToHigh") {
            sortedEvents = events.slice().sort((a, b) => a.cost - b.cost);
        } else if (sortValue === "highToLow") {
            sortedEvents = events.slice().sort((a, b) => b.cost - a.cost);
        } else if (sortValue === "sortByName") {
            sortedEvents = events.slice().sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sortedEvents = events.slice(); // No sorting, keep original order
        }

        const searchQuery = searchInput.value.trim();
        const filteredEvents = searchQuery ? searchEvents(searchQuery) : sortedEvents;

        updateCardDisplay(filteredEvents);
    });

    searchInput.addEventListener("input", () => {
        const sortValue = sortSelect.value;
        const searchQuery = searchInput.value.trim();
        const filteredEvents = searchQuery ? searchEvents(searchQuery) : events.slice();

        if (sortValue === "lowToHigh") {
            filteredEvents.sort((a, b) => a.cost - b.cost);
        } else if (sortValue === "highToLow") {
            filteredEvents.sort((a, b) => b.cost - a.cost);
        } else if (sortValue === "sortByName") {
            filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
        }

        updateCardDisplay(filteredEvents);
    });

    // Initial display on page load
    updateCardDisplay(events);
});
