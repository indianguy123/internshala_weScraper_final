const puppeteer = require("puppeteer");
let { id, pass } = require("./secret");
let dataFile = require("./data");
let tab;
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  tab = pages[0];
  await tab.goto("https://internshala.com/");
  await tab.click(".login-cta");
  await tab.type("#modal_email", id);
  await tab.type("#modal_password", pass);
  await tab.click("#modal_login_submit");

  await tab.waitForNavigation({ waitUntil: "networkidle2" });

  //   await tab.click(
  //     ".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow"
  //   );

  //let profile_options = await tab.$$(".profile_options a");
  //console.log(profile_options);

  //   let app_urls = [];
  //   for (let i = 0; i < 11; i++) {
  //     let url = await tab.evaluate(function (ele) {
  //       return ele.getAttribute("href");
  //     }, profile_options[i]);
  //     app_urls.push(url);
  //   }
  //   await new Promise(function (resolve, reject) {
  //     return setTimeout(resolve, 2000);
  //   });
  //await tab.goto("https://internshala.com" + app_urls[1]);

  await tab.click(".todo-tile ");
  await tab.waitForSelector("#resume-education #education", { visible: true });
  //await tab.waitForNavigation({ waitUntil: "networkidle2" });
  await tab.click("#resume-education #education");
  await tab.waitForSelector("#graduation-tab .ic-16-plus", { visible: true });
  await tab.click("#graduation-tab .ic-16-plus");
  await graduation(dataFile[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });


  await tab.waitForSelector("#training-resume .ic-16-plus", { visible: true });
  await tab.click("#training-resume .ic-16-plus");

  await training(dataFile[0]);

  //
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await tab.waitForSelector("#work-modal .ic-16-plus", { visible: true });
  await tab.click("#work-modal .ic-16-plus");


  await workSample(dataFile[0]);

  //4
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });
  await application(dataFile[0]);
})();

//this will fill the graduation details
async function graduation(data) {
//   await tab.waitForSelector("#degree_completion_status_pursuing", {
//     visible: true,
//   });
//   await tab.click("#degree_completion_status_pursuing");

  await tab.waitForSelector("#college", { visible: true });
  await tab.type("#college", data["College"]);
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 2000);
  });

  await tab.waitForSelector("#start_year_chosen", { visible: true });
  await tab.click("#start_year_chosen");
  await tab.waitForSelector(".active-result[data-option-array-index='5']", {
    visible: true,
  });
  await tab.click(".active-result[data-option-array-index='5']");

  await tab.waitForSelector("#end_year_chosen", { visible: true });
  await tab.click("#end_year_chosen");
  await tab.waitForSelector(
    "#end_year_chosen .active-result[data-option-array-index = '6']",
    { visible: true }
  );
  await tab.click(
    "#end_year_chosen .active-result[data-option-array-index = '6']"
  );

  await tab.waitForSelector("#degree", { visible: true });
  await tab.type("#degree", data["Degree"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });
  await tab.waitForSelector("#stream", { visible: true });
  await tab.type("#stream", data["Stream"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });
  await tab.waitForSelector("#performance-college", { visible: true });
  await tab.type("#performance-college", data["Percentage"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await tab.click("#college-submit");

  
}

//this will the training data
async function training(data) {
    
  
    await tab.waitForSelector("#other_experiences_course", { visible: true });
    await tab.type("#other_experiences_course", data["Training"]);
  
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
    });
  
    await tab.waitForSelector("#other_experiences_organization", {
      visible: true,
    });
    await tab.type("#other_experiences_organization", data["Organization"]);
  
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
    });
  
    await tab.click("#other_experiences_location_type_label");
  
    await tab.click("#other_experiences_start_date");
  
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });
  
    await tab.waitForSelector(".ui-state-default[href='#']", { visible: true });
    let date = await tab.$$(".ui-state-default[href='#']");
    await date[0].click();
    await tab.click("#other_experiences_is_on_going");
  
    await tab.waitForSelector("#other_experiences_training_description", {
      visible: true,
    });
    await tab.type(
      "#other_experiences_training_description",
      data["description"]
    );
  
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
    });
  
    await tab.click("#training-submit");
  }
  
//this will paste work samples
async function workSample(data) {
    await tab.waitForSelector("#github_profile", { visible: true });
    await tab.type("#github_profile", data["link"]);
    await tab.waitForSelector("#work-samples-submit", { visible: true });
    await tab.click("#work-samples-submit");
  }

  //this will apply to jobs
  async function application(data) {
     await tab.goto("https://internshala.com/the-grand-summer-internship-fair");

     
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
    });
    await tab.waitForSelector(".view_detail_button", { visible: true });
    let details = await tab.$$(".view_detail_button");
    let detailUrl = [];
    // for (let i = 0; i < 3; i++) {
    //   let url = await tab.evaluate(function (ele) {
    //     return ele.getAttribute("data-href");
    //   }, details[i]);

    //     detailUrl.push(url);
      
    // }
    // console.log(detailUrl);
    // for (let i of detailUrl) {
    //   await apply(i, data);
    //   await new Promise(function (resolve, reject) {
    //     return setTimeout(resolve, 1000);
    //   });
    // }
    //------------------------------------------------------------------------------------
    await tab.waitForSelector(".internship-heading-container", { visible: true });
    await tab.click(".internship-heading-container");

    await tab.waitForSelector("#continue_button", { visible: true });
    await tab.click("#continue_button");


    //ic-16-copy
    await tab.waitForSelector(".ic-16-copy", { visible: true });
    await tab.click(".ic-16-copy");



    //

    apply();
    
    


  }

//this will apply to particular post.
// async function apply(url, data) {
//   await tab.goto("https://internshala.com/" + url);

//   await tab.waitForSelector(".btn.btn-large", { visible: true });
//   await tab.click(".btn.btn-large");
//   //console.log("c1");

//   await tab.waitForSelector(".btn.btn-large.education_incomplete.proceed-btn", { visible: true });
//   await tab.click(".btn.btn-large.education_incomplete.proceed-btn");

//   //console.log("c2");
//   await tab.waitForSelector(".textarea.form-control.valid", { visible: true });
//   let ans = await tab.$$(".textarea.form-control.valid");

//   for (let i = 0; i < ans.length; i++) {
//     if (i == 0) {
//       await ans[i].type(data["hiringReason"]);
//       await new Promise(function (resolve, reject) {
//         return setTimeout(resolve, 1000);
//       });
//     } else if (i == 1) {
//       await ans[i].type(data["availability"]);
//       await new Promise(function (resolve, reject) {
//         return setTimeout(resolve, 1000);
//       });
//     }
//   }

//   await tab.click(".submit_button_container");
//   //or:await tab.click("#submit");
// }

//to apply
async function apply(){
  const [fileChooser] = await Promise.all([
    tab.waitForFileChooser(),
    tab.click('.ic-24-upload')
  ])
  await fileChooser.accept(["C:\\Users\\sanka\\OneDrive\\Desktop\\Sankalp_Dixit_3.pdf"]);
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 2000);
  });
}

//https://internshala.com//internship/details/rpa-development-internship-in-gurgaon-at-natwest-group1717764463
//https://internshala//internship/details/rpa-development-internship-in-gurgaon-at-natwest-group1717764463