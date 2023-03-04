const assetsPath = "./assets/sidebar";
const buttonsData = [
  {
    label: "Home",
    src: `${assetsPath}/home-active.png`,
    pageContent: "<home-page></home-page>",
  },
  {
    label: "Monitoring",
    src: `${assetsPath}/monitoring.png`,
    pageContent: "<h1>Monitoring Page</h1>",
  },
  {
    label: "System Alert",
    src: `${assetsPath}/systemAlert.png`,
    pageContent: "<h1>System Alert Page</h1>",
  },
  {
    label: "Web Error",
    src: `${assetsPath}/webError.png`,
    pageContent: "<h1>Web Error Page</h1>",
  },
  {
    label: "Tasks",
    src: `${assetsPath}/tasks.png`,
    pageContent: "<h1>Tasks Page</h1>",
    size: {
      height: "40px",
      width: "32px",
    },
  },
  {
    label: "Client Claims",
    src: `${assetsPath}/clientClaims.png`,
    pageContent: "<h1>Client Claims Page</h1>",
    size: {
      height: "40px",
      width: "40px",
    },
  },
  {
    label: "Education",
    src: `${assetsPath}/education.png`,
    pageContent: "<h1>Education Page</h1>",
    size: {
      height: "45px",
      width: "45px",
    },
  },
  {
    label: "Our Projects",
    src: `${assetsPath}/ourProjects.png`,
    pageContent: "<h1>Our Projects Page</h1>",
    size: {
      height: "40px",
      width: "40px",
    },
  },
  {
    label: "Ideas",
    src: `${assetsPath}/ideas.png`,
    pageContent: "<h1>Ideas Page</h1>",
    size: {
      height: "40px",
      width: "40px",
    },
  },
  {
    label: "Sharing",
    src: `${assetsPath}/sharing.png`,
    pageContent: "<h1>Sharing Page</h1>",
    size: {
      height: "32px",
      width: "32px",
    },
  },
];

class Sidebar extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    // Bind selectButton function to Sidebar instance
    this.selectButton = this.selectButton.bind(this);
  }

  // Handles selecting a sidebar button
  selectButton(event) {
    // Remove 'active' class from all buttons
    let activeButton = this.querySelector(".active");
    activeButton.classList.remove("active");
    activeButton.querySelector("img").src = activeButton
      .querySelector("img")
      .src.replace("-active", "");

    // Add 'active' class to clicked button
    event.currentTarget.classList.add("active");
    event.currentTarget.querySelector("img").src = event.currentTarget
      .querySelector("img")
      .src.replace(".png", "-active.png");

    // Update main content container with clicked button's page content
    let mainContentContainer = document.querySelector(
      ".main-content-container"
    );
    mainContentContainer.innerHTML = event.currentTarget.dataset.pagecontent;
  }

  // Called when the Sidebar custom element is added to the page
  connectedCallback() {
    // Generate the HTML for the sidebar buttons
    const buttonsHtml = buttonsData
      .map((button, index) => {
        return `
          <a class="sidebar-btn d-flex flex-column-row align-items-center ${
            index === 0 ? "active" : ""
          }" data-pagecontent="${button.pageContent}"  ${
          button.size ? `style= "height: ${button.size.height};"` : ""
        }>
            <img class="sidebar-btn-icon" src="${button.src}"  ${
          button.size ? `style="width: ${button.size.width} !important;"` : ""
        }/>
            <span class="sidebar-btn-label">${button.label}</span>
          </a>
        `;
      })
      .join("");

    // Add the HTML for the sidebar buttons to the Sidebar custom element
    this.innerHTML = `<div class="sidebar d-flex flex-column">${buttonsHtml}</div>`;

    // set default pageContent for Home button
    const defaultPageContent = buttonsData[0].pageContent;
    const mainContentContainer = document.querySelector(
      ".main-content-container"
    );
    mainContentContainer.innerHTML = defaultPageContent;

    // get all the sidebar buttons and add a click event listener to each
    let sidebarButtons = this.querySelectorAll(".sidebar-btn");
    for (let i = 0; i < sidebarButtons.length; i++) {
      sidebarButtons[i].addEventListener("click", this.selectButton);
    }
  }
}

customElements.define("main-sidebar", Sidebar);
