const appbarAssetsPath = "./assets/appbar";
const appbarButtonsData = [
  {
    label: "Discuss",
    src: `${appbarAssetsPath}/discuss.png`,
  },
  {
    label: "Missed calls",
    src: `${appbarAssetsPath}/missedCalls.png`,
  },
  {
    label: "Meetings",
    src: `${appbarAssetsPath}/meetings.png`,
  },
  {
    label: "Reminder",
    src: `${appbarAssetsPath}/reminder.png`,
  },
  {
    label: "Information",
    src: `${appbarAssetsPath}/information.png`,
  },
  {
    label: "Remote",
    src: `${appbarAssetsPath}/remote.png`,
  },
];

class Appbar extends HTMLElement {
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

    // // Update main content container with clicked button's page content
    // let mainContentContainer = document.querySelector(
    //   ".main-content-container"
    // );
    // mainContentContainer.innerHTML = event.currentTarget.dataset.pagecontent;
  }

  // Called when the Sidebar custom element is added to the page
  connectedCallback() {
    // Generate the HTML for the sidebar buttons
    const buttonsHtml = appbarButtonsData
      .map((button, index) => {
        return `
          <a class="appbar-btn d-flex flex-column align-items-center ${
            index === 0 ? "active" : ""
          }">
            <img class="appbar-btn-icon" src="${button.src}"  ${
          button.size
            ? `style="width: ${button.size.width} !important; height: ${button.size.height} !important;"`
            : ""
        }/>
            <span class="appbar-btn-label">${button.label}</span>
          </a>
        `;
      })
      .join("");

    // Add the HTML for the sidebar buttons to the Sidebar custom element
    this.innerHTML = `<div class="d-flex flex-row justify-content-center">${buttonsHtml}</div>`;

    // get all the sidebar buttons and add a click event listener to each
    let appbarButtons = this.querySelectorAll(".appbar-btn");
    for (let i = 0; i < appbarButtons.length; i++) {
      appbarButtons[i].addEventListener("click", this.selectButton);
    }
  }
}

customElements.define("main-appbar", Appbar);
