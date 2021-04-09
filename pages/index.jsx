import { useState } from 'react';
import { MainLayout, SearchItem } from '../components';
import style from '../styles/components/Home.module.scss'

function index() {

    const clientKey = "3o3cp1dy9l81r6dmvmco5l2i3ddpcy";
    const accessToken = "j5he5gvsh8p72g5hbnbjaj49uztpaf";

    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const linkText = `https://api.twitch.tv/helix/search/channels?query=${text}`;


    const onChangeValue = (e) => {
        const value = e.currentTarget.value
        setText(value)
    }

    const getData = () => {
        fetch(linkText, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'client-id': clientKey
            },
        }).then(data => data.json())
            .then(json => json.data[0].id)
            .then(id => getVideos(id))

    }


    const getVideos = async (id) => {
        const link = `https://api.twitch.tv/helix/videos?user_id=${id}&first=21`;

        const fetchData = await fetch(link, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'client-id': clientKey
            },
        });

        const { data } = await fetchData.json();

        const clonedData = data;

        const re = /%{width}x%{height}/gi;

        const modifiedData = clonedData.map((video) => ({
            id: video['id'],
            title: video['title'],
            url: video['url'],
            thumbnail: video['thumbnail_url'].replace(re, '1920x1080'),
        }))

        setItems(modifiedData);
        setText('');
    }


    return (
        <MainLayout title={'Search videos'}>
            <div className={style.content_wrapper}>
                <div className={style.search}>
                    <p>Введите название канала</p>
                    <input type="text" value={text} placeholder="Enter the name..." onChange={onChangeValue} />
                    <button onClick={getData}>Найти</button>
                </div>
                <div className={style.content}>
                    {
                        items && items.map((item, index) => <SearchItem item={item} key={index} />)
                    }
                </div>
            </div>

        </MainLayout>
    )
}

export default index
