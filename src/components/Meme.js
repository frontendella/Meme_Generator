import { useState, useEffect } from "react"

export const Meme = () => {

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])


    const getMemeImage = () => {

        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const randomMeme = allMemes[randomNumber].url

        setMeme(prevMeme => ({
            ...prevMeme,
            image: randomMeme
        }))
    }


    const [meme, setMeme] = useState(
        {
            topText: "",
            bottomText: "",
            image: "https://i.imgflip.com/4xgqu.jpg",
        }
    )


    const handleChange = (event) => {
        const { name, value } = event.target
        setMeme(
            prevMeme => ({
                ...prevMeme,
                [name]: value
            })
        )
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <button onClick={getMemeImage} className="form--button">Get a new meme image 🖼️ </button>
            </div>
            <div className="meme">
                <img src={meme.image} className="meme--image" alt="meme_image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}