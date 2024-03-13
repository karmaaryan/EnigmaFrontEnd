'use client';

import styles from "./convostyles.module.scss"
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

// const QnAData = {
//     questions: [],
//     answer: [],

// }

function Convo(){

    if (!window){
        return <div></div>
    }

    const sessionSummaryData = window.sessionStorage.getItem("summary_response");
    const router = useRouter();
    const [summarydataupdate, setsummarydataupdate] = useState("")

    if (!sessionSummaryData) {
        router.push("/");
        return;
    };

    const summaryData = JSON.parse(sessionSummaryData);

    const [inputQuery, updateData] = useState("")

    function handleInputChange(e){
        updateData(e.target.value)
    }

    function handleSubmit(){
        apifetch(inputQuery)
    }

    
//   useEffect(()=>{

    let data = ""

    async function apifetch (query) {
      try{
        const dataraw = await fetch("http://localhost:8000/chat/" + summaryData.session_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: query
      })
    });
    
      if(!dataraw.ok){
        console.log("aip not working")
      }

      data = await dataraw.json();
      console.log(data.content)

      }catch(error){
        console.log("got error: \n", error)
      }
    }

//   },[])

    // console.log(summaryData)
    // console.log("original text: \n" + summaryData.original_text)
    // console.log("summary: \n" + summaryData.summary)
    // console.log("key entities: \n" + summaryData.key_entities)

    return <div className={styles.parentContainer}>

        <Navbar/>

        <div className={styles.main}>

            <div id={styles.containers}>
                <h2> 
                    {/* <Image
                        className={styles.robotIconImg}
                        src="/img/robotIcoEdit.png"
                        width={50}
                        height={50} 
                        alt="roboIcon"
                    /> */}

                    <img className={styles.robotIconImg} src="/img/robotIcoEdit.png" alt="roboIcon" />

                Summary-</h2>
                <p className={styles.summary}>{summaryData.summary}</p>
            </div>

            <div id={styles.containers}>
                <h2>
                {/* <Image
                        className={styles.robotIconImg}
                        src="/img/robotIcoEdit.png"
                        width={50}
                        height={50} 
                        alt="roboIcon"
                    /> */}

                <img className={styles.robotIconImg} src="/img/robotIcoEdit.png" alt="roboIcon" />


                Key Entities-</h2>
                <ol className={styles.keypoints}>
                    {summaryData.key_entities.map((input, index)=>{
                        return <li key={index}>{input}</li> 
                    })}
                </ol>   

            </div>

            
            <div id={styles.containers}>
                <h2 className={styles.marginTop1rem}> 
                    {/* <Image
                        className={styles.robotIconImg}
                        src="/img/youLogo.png"
                        width={40}
                        height={40} 
                        alt="roboIcon"
                    /> */}

                    <img className={styles.youLogo} src="/img/youLogo.png" alt="user logo" />

                You</h2>
                <p className={styles.que}> This is the question </p>
            </div>
            
            <div id={styles.containers}>
                <h2> 
                    {/* <Image
                        className={styles.robotIconImg}
                        src="/img/robotIcoEdit.png"
                        width={50}
                        height={50} 
                        alt="roboIcon"
                    /> */}

                    <img className={styles.robotIconImg} src="/img/robotIcoEdit.png" alt="roboIcon" />

                Enigma</h2>
                <p className={styles.ans}> This is the question </p>
            </div>

        </div>  

        <div className={styles.inputbox}>
            
            <form action="" method="post">
                {/* <input type="text" name="query" id="query" placeholder="Ask more on it" /> */}
                <textarea onChange={(event)=>handleInputChange(event)} type="text" name="query" id="query" placeholder="Ask more on it" ></textarea>
                <div onClick={(event)=>handleSubmit(event)} className={styles.imageContainer}>
                    <Image
                        className={styles.inputArrow}
                        src="/img/inputArrow.png"
                        width={22}
                        height={15} 
                        alt="input arrow"
                    />
                </div>
            </form>
        </div>
    </div>  


}

export default Convo;