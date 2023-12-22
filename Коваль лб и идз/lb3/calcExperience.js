function calculateExperience() {
    const inputs = document.querySelectorAll("input[required]");
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    const employeeData = [
        {
            name: document.getElementById("employee1Name").value,
            hireDate: new Date(
                document.getElementById("employee1HireDate").value
            )
        },
        {
            name: document.getElementById("employee2Name").value,
            hireDate: new Date(
                document.getElementById("employee2HireDate").value
            )
        },
        {
            name: document.getElementById("employee3Name").value,
            hireDate: new Date(
                document.getElementById("employee3HireDate").value
            )
        },
        {
            name: document.getElementById("employee4Name").value,
            hireDate: new Date(
                document.getElementById("employee4HireDate").value
            )
        },
        {
            name: document.getElementById("employee5Name").value,
            hireDate: new Date(
                document.getElementById("employee5HireDate").value
            )
        }
    ];

    const currentDate = new Date();
    let totalExperience = 0;

    document.getElementById("employeeExperienceList").innerHTML = "";
    for (const employee of employeeData) {
        const differenceInMilliseconds = currentDate - employee.hireDate;
        const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${employee.name}:</strong> ${Math.floor(
            differenceInDays / 365
        )} років ${Math.floor(
            (differenceInDays % 365) / 30
        )} місяців ${Math.floor((differenceInDays % 365) % 30)} днів`;
        document.getElementById("employeeExperienceList").appendChild(listItem);

        totalExperience += differenceInDays;
    }

    const averageExperience = Math.floor(totalExperience / employeeData.length);
    const averageYears = Math.floor(averageExperience / 365);
    const averageMonths = Math.floor((averageExperience % 365) / 30);
    const averageDays = Math.floor((averageExperience % 365) % 30);

    document.getElementById(
        "averageExperience"
    ).innerHTML = `${averageYears} років ${averageMonths} місяців ${averageDays} днів`;
}

document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const dateInputs = document.querySelectorAll('input[type="date"]');
    for (let i = 0; i < dateInputs.length; i++) {
        dateInputs[i].setAttribute("max", formattedDate);
    }
});
