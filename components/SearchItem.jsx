import { useState } from 'react';
import style from '../styles/components/Home.module.scss';

function SearchItem({ item }) {

    const [isClicked, setIsClicked] = useState(false);

    const onAddVideo = () => {
        sessionStorage.setItem(`${item.id}`, JSON.stringify(item));
        setIsClicked(!isClicked)
    }


    return (
        <div className={style.item}>
            <a href={item.url} target="_blank">
                <div className={style.title_wrapper}>
                    <h2>{item.title}</h2>
                </div>
            </a>
            <div className={style.item_add}>
                {
                    !isClicked ? <button className={style.item_btn} onClick={onAddVideo}>Добавить</button> : <button className={style.item_btn}>Добавлено</button>
                }
            </div>
        </div>
    )
}

export default SearchItem
