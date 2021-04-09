import { useState, useEffect } from 'react';
import { MainLayout } from '../components';
import style from '../styles/components/Home.module.scss';


function favorite() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        (Object.values(sessionStorage).map((obj) => {
            const addVideos = obj => {
                setVideos(prevVideos => [...prevVideos, obj])
            }
            addVideos(JSON.parse(obj))
        }))
    }, [])

    const onRemove = (obj) => {
        setVideos((prevVideos) => prevVideos.filter((item, index) => obj.id !== item.id));
        sessionStorage.removeItem(obj.id)
    }

    const removeTask = (obj) => {
        if (confirm("Удалить видео?")) {
            onRemove(obj)
        }
    }

    const clearAll = () => {
        sessionStorage.clear();
        setVideos([]);
    }

    return (
        <MainLayout title={'Favorite videos'}>

            <div className={style.content_wrapper}>
                <div className={style.buttonClearAll_wrapper}>
                    <button onClick={clearAll} className={style.actionBtn}>Удалить все</button>
                </div>
                <div className={style.content}>

                    {
                        videos && videos.map((obj, index) => {
                            return (
                                <div className={style.item} key={index}>
                                    <a href={obj.url} target="_blank">
                                        <img src={obj.thumbnail} alt="thumbnail" />
                                        <div className={style.title_wrapper}>
                                            <h1>{obj.title}</h1>
                                        </div>
                                    </a>
                                    <div className={style.item_add}>
                                        <button className={style.actionBtn} onClick={() => removeTask(obj)}>Удалить</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </MainLayout >
    )
}

export default favorite