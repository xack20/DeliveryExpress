//NPM scripts
import React,{useEffect} from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../Ethereum/delivery.js";
import LayoutCustom from "../Components/LayoutCustom.js";
import { Icon, notification } from "antd";

// var perf =require('./home.html');

//CSS imports
import "antd/dist/antd.css";
import styles from "./index.module.css";
import web3 from "../Ethereum/web3.js";
import { duration } from "moment";

const index = (props) => {

  useEffect(async() => {
    try {
      
      const acc = await web3.eth.getAccounts();
      const admin = await delivery.methods.admin().call({from : acc[0]});
      const info = await delivery.methods.getUserInfo(acc[0]).call({ from: acc[0] });
      if(acc[0] === admin){
        notification.info({
          message: "Admin loggedin",
          description: "You are the admin of this project",
          placement : "bottomRight",
          duration : 3
        });
      }
      else if(info.name){
        notification.info({
          message: "User loggedin",
          description: "Welcome "+info.name,
          placement : "bottomRight",
          duration: 3
        });
      }
      else{
        notification.warning({
          message: "No Account Found",
          description: "You are not registered!\n or, Install metamask and make sure you have logged in!",
          placement : "bottomRight",
          duration : 3
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        description: error.description,
        placement: 'top-right',
        duration: 3
      });
    }
  }, [])


  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <LayoutCustom>
      <Head>
        <title>Delivery Express</title>
      </Head>
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* font awesome */}
        {/* Google fonts */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        {/* 1 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet" />
        {/* 2 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap" rel="stylesheet" />
        <title>Delivery Express</title>
        <style dangerouslySetInnerHTML={{__html: "\n        body {\n            margin: 0;\n        }\n\n        .horizontal-line {\n            width: 10%;\n            border: 2px solid red;\n        }\n\n        p {\n            font-size: 24px;\n            font-family: 'Libre Baskerville', serif;\n        }\n\n        h1 {\n            font-size: 80px;\n            font-family: 'Cabin', sans-serif;\n        }\n\n        .item-1 {\n            background-image: url(https://lh3.googleusercontent.com/OFpjz_iyIs96vSsbIC7IRm6HRNIClgxgll8NEWJUA44h-Y9hZ772NGN1xKJLSvv5aT_POjS0B62heQVLkapvITNguJvWBP5_jY_ASRYHF87-1ckFyJWnNaSX4W9KqxN6rvw6uC_Fx2Xg8OZzqu5BxwE-3PtSgiFVkjeGXcnKMhLiAdbHH0ZPWAi8CQGywLSNnOuSk5qugeewH0Ioy4dIjpuItAuW5Lx2XWkMf0azUgxDb4RbRCqNxbhT8CrnGVmTU1N3lZFpn3N9FJOfhTtsDqVZL1cqqB5FxSgNrsizh17Zkxy6ZklNu_BXJ4mCQwTtkRw1OFdJ5CUTDbdsoCCiiEiEos8VlvbvAlEUuSMebv_6OYrpXTeX44ZyJzph5b1paGTb18Ajs0bVkCJx4wlBU5mMhB54-9Qo8VunW5xu21t1irqLaa37xbpmB5BzFST9yB6Q4L1YngQ6ouxwbsbYTvtH2Lu5XCkq6X7EhilBfOzy_Gb_I1ARBl2gu2SWZlZ1Hw_LGB8EcgeArk8mQbTzB05tYzQkz-M1n7I5HyMClYs9_kWlqtmBBuvgtFhiw-S5jb9f01tf4sGYmySAw9h_9gfUHJvRBi4pN2LULvKuy_jvuP00xm60_LVi7Co6Sm5Ne5E5kbf7yyt96wE_vtQhn9hK_RwqOCvVvxElJPJUzpX4AwfZ3H07NuWt_CmOs4gx5mHN6-GukjzTEPX-n-e9LpU=w1334-h889-no?authuser=0);\n            background-size: cover;\n            padding: 300px 20px;\n            color: white;\n            text-align: center;\n        }\n\n\n        .item-2 {\n            background-image: url(https://lh3.googleusercontent.com/K3r5-e_Itj56Jryv0FE3eibUzOeMU57vaKGTRbuEG72bfJlL-HiC5LEdVNOOD_lAEi_Hq9fKc-VXrJI5tIV9FXdBisu3RB3Y3lBksTwI89A4qVR7Qu-vpFRYL7yUgJyed3SsY7JlZFPV_vYYSlLM1s789Diq5nNO3-T2DlCViL890CFLdsd-D5VuW-V40xY0muD7PlH9DyRPVLo-8C6gZ13RMF5MJCrT0ARWadljg91fgdLI6hWRBXwJb7DClpLosxqXPHPWg2ZovwILih1-k8F7XbiRpzdr_bI03znnDyL-cPN7sVxziEWO1EepRqgYCQQfzuhzhFbQWSFPMP1Akz83S84Az9kujrewJDVBytEq3B4asJWLAPak2JNyeon6I4RcMeH0xocMcvrfIyIZVdFgzVTNc4rxCXF0_MjWb0zx0byn1_m4qivXpP5FKscnet_CpWwoL1ABli4RsRQbSQpB49yTaf_YqwUmfsV-T6aO9TSbR3gB6Mvk_X5i70vsZBrRM1hUqpSB6jzxHqkJUSUnD6elTlEZw-y_Pxz1MuR64KDoSqr_KY0iMZaflypxn7aCWODOcpmn6pQCZXLHdWushZcoUzcAoGMQGcyVSEdyHQqBbSaIxQlQlnbqfI0c18DfZGkyFRr8yZrsnJfinzxsJX_UzJlC_Yg7ZNLfmnwkHpZiR9dl2RlhaxMwURPQutpP3i1dsOvqFz6AX6gfrBQ=w1340-h890-no?authuser=0);\n            background-size: cover;\n            padding: 300px 20px;\n            color: white;\n            text-align: center;\n        }\n\n        /* Parallax */\n        .parallax-heading-1 {\n            text-align: center;\n        }\n\n        .parallax-1 {\n            background-image: url(https://lh3.googleusercontent.com/gNv-vxxSp2VTsWfvcxNQq9QXQmvI1m5VIJskycxy3C9wF5rwKY6d-diKbtGSHkvNIlk8Kgg34R0Nrc36SOtnGeToO_Z1Uv1U1V2_-Tt0KbeJ0TCScmgTWIV_Xx3rOO8NWmTPfRO7IL-G1CM6t_hQKh08fs4xmjOaqVmYt5k5Jo2PRjaxskc1OoUc2PTW8ixKuQigV1iX8MyHp9L4METTEZZNMboyXNsMaFO3CJpW6uLipen8Fc8425CiZlvJgNUVF765124jE65HuCz6mntxSd_TCauK-e89jvWbBPueKfbeJImBGioktssE-eVre3q0W4HQLiQZOnkKUOk-ef3nZzX4KZ2RFLjOaXuQPCLKRKegpZXmTp0097m0_o8ldzyH5GtDkRAigtd8wlbrhY_skck2ZBGNaW-TWntiZ7oCamJSdrRRnxa_AkLPDNEaYtrYtQ3CErjy-3JKvtWumm1vTYiWlLMnZhvcOyMkOalP85v_g1EQx1LDqf2iYKFBlE6rCBpmgRiks63yR5tkIDp1IcE_h9F8WncUAQvvp-s1pEbp13Pbd8KkQVJvUm14vz029JjUwQxykjYezEA0LtPeL6Bwo8XjLKfFnishbOtcnvf4AwJ_QNQo2cSCblFzdUBjHdyq-EEQLE0qCxRXNgcox2Vfi_1rHIvvRTkzKNq_CsBbXH3PHVo6qlznQw7g5SI6js7hZZRaEN6-dv_wcuBpDJU=s889-no?authuser=0);\n            background-attachment: fixed;\n            background-position: center;\n            background-repeat: no-repeat;\n            background-size: cover;\n        }\n\n        .parallax-1 p {\n            font-size: 18px;\n        }\n\n        .parallax-1 h2 {\n            font-size: 40px;\n            color: #FA4519;\n            font-family: 'Cabin', sans-serif;\n        }\n\n        .parallax-heading-2 {\n            text-align: center;\n        }\n\n        .parallax-2 {\n            background-image: url(https://lh3.googleusercontent.com/QKgGwvvcWRu0ceW-yC_ua7oj-wKiUr-alsAN-wSNCCmtE3QpDaxgPG4O5Cp6LvHgH30GrqPBEK7BihjsDwzdIWOR4_LoSMVzODcbNxDLUpIwLqdjmMDyRnKpdisM1JmEqLh3oSNCPi8g6nqL-51JTxhSF0zELZaVYIngmGcQDD_-HegyJtJOQm-9zuvKI56Cxc3hugLP2znJWkQuwAv3B12BiIYXztheodyTlOQ2c-USqzXkOIFW0xec9_iWjVAPbL3Wx2KAxIdaWxrTc5KQ3jrkD-xaLDG816zWsqRNT107slvL8csYpxGfBv8wpZIxtjMm-U6xjEX8rMUKWxzkWNc9fuKNhWhIQtN4FqCEgZiSuJXqFe4hsMNjy43OLILq_r4tOyiSo1m5RKaaTn2YQztAZLTzMdbWYAqsq4pjTYoGgOudraaNzX3XTwC63WYToUvin3ySgh6Lp5sWVihsZzbEq5k9hWktibn4MLbE7KSiWDRH1a2kPdBIgNBu3-pMEiNOoQW9bhljZbc76APHuPWX0-telbrSrHa---2ewr5I5VtAr_MN0UWzM6m34vg_XKkuU3cbPhhtEhdNjruc2qGbyyVlpfZoqAJCNTtZ_r22Zzf3Gup6YsELj2ETde26OOIMwiKrFAlaFWNYzmcj2KmB9oqV7ODj3MLA2F4_iKwamGsFPBEsvXPdypN2FgOWekyw2r8RbOKuwBOCGzsUhyU=w1582-h889-no?authuser=0);\n            background-attachment: fixed;\n            background-position: center;\n            background-repeat: no-repeat;\n            background-size: cover;\n            padding-bottom: 150px;\n        }\n\n        .parallax-2 p {\n            margin: 0;\n            padding-top: 100px;\n            font-size: 18px;\n            color: #FFFFFF;\n        }\n\n        .parallax-2 h2 {\n            font-size: 40px;\n            color: #FFFFFF;\n            padding-bottom: 50px;\n            font-family: 'Cabin', sans-serif;\n        }\n\n        .parallax-description {\n            display: flex;\n            justify-content: center;\n        }\n\n        /* Card Section */\n\n        .card-section {\n            display: flex;\n        }\n\n        .card-description {\n            padding: 20px;\n            text-align: justify;\n        }\n\n        .card-description-heading-1 {\n            font-size: 13px;\n            font-family: 'Libre Baskerville', serif;\n            color: #4a555d;\n        }\n\n        .card-description-heading-2 {\n            font-size: 13px;\n            font-family: 'Cabin', sans-serif;\n            color: #4a555d;\n        }\n\n        h3 {\n            color: red;\n            font-size: 21px;\n            font-family: 'Cabin', sans-serif;\n        }\n\n        .card-description1 {\n            padding: 20px;\n        }\n\n        .card-search .fas {\n            text-align: justify;\n        }\n\n        #card-search:hover .fas {\n            display: block;\n            background-color: rgba(206, 182, 120, 0.226);\n        }\n\n        .card-2 {\n            padding: 30px;\n            background-color: #27323d6c;\n            margin: 40px;\n            text-align: justify;\n        }\n\n        /* icons */\n        .icon {\n            color: #4A555D;\n            background-color: #8a939991;\n            padding: 10px;\n            margin: 70px;\n            border-radius: 50%;\n            line-height: 5em;\n        }\n\n        .icons:hover {\n            transform: scale(1.5);\n            transition: transform 1s ease-in-out;\n        }\n\n        .logos {\n            display: grid;\n            grid-template-columns: repeat(4, 1fr);\n        }\n\n        .logo {\n            width: 300px;\n        }\n\n        .logo:hover {\n            transform: scale(1.05);\n        }\n\n        .car {\n            margin-top: -40px;\n            float: right;\n        }\n\n        .car-img {\n            width: 300px;\n            padding-right: 40px;\n        }\n\n        /* calculator */\n        .calculator-title {\n            padding: 70px;\n        }\n\n        .calculator-title h2 {\n            font-size: 40px;\n            font-family: 'Cabin', sans-serif;\n        }\n\n        .calculator-section {\n            padding: 40px;\n            margin: 40px;\n        }\n\n        .calculator-section p {\n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        }\n\n        .input-field {\n            margin-left: 100px;\n            padding: 5px;\n        }\n\n        /* footer */\n        .footer-section {\n            display: flex;\n            background-color: #42576A;\n        }\n\n        .newses {\n            padding: 50px;\n        }\n\n        .newses h3 {\n            margin-left: 30px;\n            color: #fd7553;\n            font-size: 18px;\n        }\n\n        .footer-line {\n            border: 2px solid white;\n            width: 200px;\n        }\n\n        .foeter-news-img {\n            width: 70px;\n            padding: 10px;\n        }\n\n        .news {\n            display: flex;\n            color: white;\n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n            font-size: 10px;\n            margin: 10px;\n        }\n\n        .news h3 {\n            color: white;\n        }\n    " }} />
        <header>
          <div className="carousel">
            <div className="item-2">
              <p>Welcome to our company</p>
              <hr className="horizontal-line" />
              <h1>DELIVERY EXPRESS</h1>
            </div>
          </div>
        </header>
        <main>
          <div className="parallax-1">
            <div className="parallax-heading-1">
              <p>Why should you choose us?</p>
              <h2>OUR STRENGTH AND ADVANTAGES</h2>
            </div>
            <div className="card-section">
              <div className="card-description">
                <img src="https://lh3.googleusercontent.com/K3r5-e_Itj56Jryv0FE3eibUzOeMU57vaKGTRbuEG72bfJlL-HiC5LEdVNOOD_lAEi_Hq9fKc-VXrJI5tIV9FXdBisu3RB3Y3lBksTwI89A4qVR7Qu-vpFRYL7yUgJyed3SsY7JlZFPV_vYYSlLM1s789Diq5nNO3-T2DlCViL890CFLdsd-D5VuW-V40xY0muD7PlH9DyRPVLo-8C6gZ13RMF5MJCrT0ARWadljg91fgdLI6hWRBXwJb7DClpLosxqXPHPWg2ZovwILih1-k8F7XbiRpzdr_bI03znnDyL-cPN7sVxziEWO1EepRqgYCQQfzuhzhFbQWSFPMP1Akz83S84Az9kujrewJDVBytEq3B4asJWLAPak2JNyeon6I4RcMeH0xocMcvrfIyIZVdFgzVTNc4rxCXF0_MjWb0zx0byn1_m4qivXpP5FKscnet_CpWwoL1ABli4RsRQbSQpB49yTaf_YqwUmfsV-T6aO9TSbR3gB6Mvk_X5i70vsZBrRM1hUqpSB6jzxHqkJUSUnD6elTlEZw-y_Pxz1MuR64KDoSqr_KY0iMZaflypxn7aCWODOcpmn6pQCZXLHdWushZcoUzcAoGMQGcyVSEdyHQqBbSaIxQlQlnbqfI0c18DfZGkyFRr8yZrsnJfinzxsJX_UzJlC_Yg7ZNLfmnwkHpZiR9dl2RlhaxMwURPQutpP3i1dsOvqFz6AX6gfrBQ=w1340-h890-no?authuser=0" alt="" style={{width: '250px', height: '150px'}} />
                <p className="card-description-heading-1">Around the world</p>
                <h3>Shipping</h3>
                <p className="card-description-heading-2">Duis hendrerit est nec eleifend euismod. Nulla tristique
                  suscipit lacinia. Fusce vel vestibulum
                  nulla, eget vehicula elit. In ut sodales ante. Duis nec.</p>
              </div>
              <div className="card-description">
                <img id="card-search" src="http://cargo.bold-themes.com/delivery-express/wp-content/uploads/sites/3/2015/09/shutterstock_202693981-1080x540.jpg" alt="" style={{width: '250px', height: '150px'}} />
                <p className="card-description-heading-1">24h a day</p>
                <h3>Courier delivery</h3>
                <p className="card-description-heading-2">Donec scelerisque velit vel tempor laoreet. Etiam rhoncus
                  placerat ex id porttitor. Quisque interdum purus vel ligula mattis egestas.</p>
              </div>
              <div className="card-description">
                <img src="http://cargo.bold-themes.com/delivery-express/wp-content/uploads/sites/3/2015/09/shutterstock_252453373-1080x540.jpg" alt="" style={{width: '250px', height: '150px'}} />
                <p className="card-description-heading-1">New service</p>
                <h3>B2B Exchange</h3>
                <p className="card-description-heading-2">Pellentesque convallis semper venenatis. Proin vitae quam
                  nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                </p>
              </div>
              <div className="card-description">
                <img src="http://cargo.bold-themes.com/delivery-express/wp-content/uploads/sites/3/2015/09/shutterstock_308425934-1000x540.jpg" alt="" style={{width: '250px', height: '150px'}} />
                <p className="card-description-heading-1">7 days a week</p>
                <h3>Logistics</h3>
                <p className="card-description-heading-2">Ut vehicula, risus vitae aliquam posuere, erat libero molestie
                  arcu, vel fermentum nulla erat vel augue. Integer pharetra dapibus arcu.</p>
              </div>
            </div>
            <div className="card-section">
              <div className="card-description1">
                <img src="https://lh3.googleusercontent.com/LS345CbjLYiLZil7hV1uj28cA4ZI38LSnEUIMUJMAfuFuyH6lbS3G8L7G0FSP01B1uS1XqebnYXK-NUHEQul-0PnE2NsfO2CT__AfhxEl_jDMGn-dHD-qMhcF1IyEzlv_AM1wAvq1PKxNYudq3Ey4iQrdlfAnInMLNclQHwjTxiaxEN-deuSJab3RFi71YN6P7TKMl8Gyv0H9d4yVKHndcntoDURDRrlUgfMHKe4EweJpX8Fn3tbAIvmiqQ1AJEzwMdXoAuVspeburB-VtzdUm2ftv3QR_pXr49u9wM0j7Qrx9vNV2d65fNEXi6YerMkVuuM1zWB8BPWiD_4yIKV51sslQI1Nd1b6zY8EZW_gkNDCNW6LlnZU7DYVETcdZADNSec_pF6wSsMmHIS2txtHOW1pPlC2bXbRLtKQ8_bXtHjxuYQlmIEdfljNefrJzgmXuwvJGjOsgGKbk4Im6xFaBQHnRSE_cV1CHN1I6PY9-Q12Hb3SXjTXKU-2dxUjd6zjHQgZBe1kP8X_qSCeiPk-fsgTSAWDu1PUuohRpyDiCw513NDOES7ZXqG457KelGJ-AbvbagLXM_kjReHxCva48ICKnt0eRDDhRsH6DlNetrgjHdO0uAamr9AL_bb63dzeXgTtC_NFoM40UaBSieRdhWvH_47wWuR82j_3fK6nimlaoZvVw9vVtFVDXMMN-FLzBculdxA_kaTVADkChEUUZk=w320-h213-no?authuser=0" alt="" style={{width: '370px', height: '186px'}} />
                <div className="icons">
                  <a className="icon" href><i className="fas fa-phone-alt" /></a>
                </div>
                <h3>24 hours support</h3>
                <p className="card-description-heading-2">Duis hendrerit est nec eleifend euismod. Nulla tristique
                  suscipit lacinia. Fusce vel vestibulum nulla, eget vehicula elit. In ut sodales ante. Duis nec
                </p>
              </div>
              <div className="card-description1">
                <img src="https://lh3.googleusercontent.com/TgMGgwObLYT9PEclzM4_2N70Rpz5yLRJMuqrYP7-uujpaUsz8lB2R47WoYe-vNcNlBG9QUA8mOtEEQHwapHY7gE-dHH4FHruaIxpiarZmWQG_3dKU0kXdd7gqNvK9JTEmOaRni2vJ4GoB-GNO_A9XuB9uG9HhVoqaNi8eXyu9oPGY2ykbUF6yTlhhlxSAX1fwyzOHn-7QKZO9c_AloRv_-rHDWbqB0Yb-Uotd7OWW0rCb7r2C7PHtJ1JghNRB5UEoK8ZuXk2Eq3GmTGOyZBZLvVfzAvWJZteOMfEZp7LdXp73m1kWh9Dih4NJc0yqwMUspCBkRKsqnlsNWNR0l7UWK-bc7hz0FRgAQsOAz4unjkKgqBkhhx1yrxKurrxw9_hMPq6dBnuFZeLA3MHH2pEPMNA1Z_AIFoymxHgrAwhBEfWAFtpt-i51IgqjvNGLlTAF4maCJcQ_0bVCY_ypZv2BprVSrX0acDYnHRsyU2Nf8ckDpOYvdTmcNFvTKxtdSi6LmLgXVOSPSBPEFBnSjZneU7lIRQRrkg-M7y8_ANgGvpN03C7qpVUHPx6qFMQkfv3odGvRUqZsqvhpg9ir91Da_xby2aFeUVwKY8VLdbLOzHJTztwHT181LfpuSLjpxSmV_gEnanw78RHBMQ2QHeaHtJHrEIbLGKNC3mWQ7nLOKbdRmcUUCm_s-biG0z-qsfcrYh0_IloUtHq922zJF1cMU0=w1080-h540-no?authuser=0" alt="" style={{width: '370px', height: '186px'}} />
                <div className="icons">
                  <a className="icon" href><i className="fas fa-globe-americas" /></a>
                </div>
                <h3>
                  Worldwide</h3>
                <p className="card-description-heading-2"> Donec scelerisque velit vel tempor laoreet. Etiam rhoncus
                  placerat ex id porttitor. Quisque interdum purus vel ligula mattis egestas</p>
              </div>
              <div className="card-description1">
                <img src="https://lh3.googleusercontent.com/9u9l4iDSc5WV1oF2w1VgaK-3te0SSC0Ra3RMd1iq0JEZdUETMC68EZlUmJyoQgJLqsVjC-I7foWcRbr0q08uQ6WuxD9Ep0uvrWDdzcP2nKVzy6HIIBtcsDYjgvEbS8kyevw0oqL7iUdhJyeFTOWnh6L_qY_0tSPSOu9YRJRR0Kz9-Lg3hxMPwpYCu-IdrrUYRYLjv2JvsY1zCXXyPcMTo-Hq0Yv9GsNSJfPFqaU1VKvDky29SHTHa6XOvuGhBviAg8GOFn6KUT2CdDfHzaQw0hk6j2xNBwJCLYIDVikmnov3ZZRuawqurLXk-o4VvOzHVeuMq5np99I5wk3xwvEsUdSPHUwPkkqo6JiXUFsIYRWYm-Kl-e_tJE4f7b9m5Qyv1S6OMN8wZH-dqpq75N6XQx7rexx5RU3sx9_PRMk_GDj_kkNepfaXuPywPU23bLYg5JKybxlydt3MOQxV_snE4rheD_2UsEBhrQJX0tcblsi8rdqtFzrktonsV2O8He5jkRSVGvvf1CoqWS2neh5Y-WfO9pCrpTz2ULEZQi9g8H1BBXtm-ETv_SFdqxkN3RmHyTMnaRHpVH_NUur_4jo3tLlFgEIptK43pQKRWVmqmyA52tGjM73CVrSK7P8dnymp9hwr3ZX_j7B4kJQWYxFJxQSVEG0_jHeq_hsQTDa3fksd0lqxpzzVblpv7SVipEQ8aJEsUkSFnS4k3N6twtjccec=w716-h358-no?authuser=0" alt="" style={{width: '370px', height: '186px'}} />
                <div className="icons">
                  <a className="icon" href><i className="fas fa-headset" /></a>
                </div>
                <h3>Direct client contact</h3>
                <p className="card-description-heading-2"> Pellentesque convallis semper venenatis. Proin vitae quam
                  nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                </p>
              </div>
            </div>
          </div>
          <section>
            <div className="parallax-2">
              <div className="parallax-heading-2">
                <p>Show your client and references</p>
                <h2>CLIENTS AND TESTIMONIALS</h2>
              </div>
              <div className="parallax-description">
                <div className="card-2">
                  <p>Pellentesque at cursus libero. Donec non varius ligula, id gravida velit. Sed id scelerisque
                    nulla. <br /> <br /> <br />
                    John Smith <br /> CTO of KLM</p>
                </div>
                <div className="card-2">
                  <p>Sed id scelerisque nulla. Pellentesque at cursus libero. Donec non varius ligula. <br /> <br />
                    <br />
                    Patrick Head <br /> ReConstruction LLC
                  </p>
                </div>
                <div className="card-2">
                  <p>Pellentesque at cursus libero. Donec non varius ligula, id gravida velit. Sed id scelerisque
                    nulla. <br /> <br />
                    <br />
                    Jane Barnes <br /> TLC General Manager
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </LayoutCustom>
  );
};


export default index;
