const jobs = [
    {
        date: "23-08-2026",
        title: "UI/UX Designer",
        tags: ["UI", "UX", "Design"],
        projectWork: "Full-Time"
    },
    {
        date: "25-08-2026",
        title: "Automation Designer",
        tags: ["Automation", "Design"],
        projectWork: "Full-Time"
    },
    {
        date: "27-08-2026",
        title: "Mobile App Designer",
        tags: ["Senior-level"],
        projectWork: "Full-Time"
    },
    {
        date: "23-08-2026",
        title: "Marketing Head",
        tags: ["Market", "Design"],
        projectWork: "Full-Time"
    },
    {
        date: "23-09-2026",
        title: "AI Engineer",
        tags: ["AI", "Machine Learning"],
        projectWork: "Full-Time"
    }
];

const jobContainer = document.querySelector(".job-container");

jobs.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <div class="company-logo" aria-hidden="true">${job.title.charAt(0)}</div>
        <div class="job-date">${job.date}</div>
        <h2>${job.title}</h2>
        <div class="job-tags">
            ${job.tags.map(tag => `<span>${tag}</span>`).join("")}
            <span>${job.projectWork}</span>
        </div>
    `;

    jobContainer.appendChild(card);
});