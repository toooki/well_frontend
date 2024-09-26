import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/InternalPage/Bucketlist.css";

function SavetheList({ formData }) {
	const handleSaveBucketlist = async () => {
		try {
			const response = await axios.post(
				"https://welldying-backend.onrender.com/savebuckitlist",
				formData
			);
			console.log(response.data); // 서버로부터 받은 응답 확인
			alert("버킷리스트가 저장되었습니다.");
		} catch (error) {
			console.error("Error:", error);
			alert("버킷리스트 저장에 실패했습니다.");
		}
	};

	return (
		<button onClick={handleSaveBucketlist} className="bucketlist-save">
			저장
		</button>
	);
}

function Checklist({ goToMenu, username, password }) {
	const [items, setItems] = React.useState([]);
	const [text, setText] = React.useState("");
	const [formData, setFormData] = useState({
		username: username,
		password: password,
		bucketList: [], // 버킷리스트를 저장할 배열 추가
	});

	const fetchUserBucketList = async () => {
		try {
			const response = await axios.get(
				`https://welldying-backend.onrender.com/bucketlistuser?username=${username}`
			);
			const userBucketList = response.data;
			setItems(userBucketList);
		} catch (error) {
			console.error("Error fetching user bucket list:", error);
		}
	};

	useEffect(() => {
		fetchUserBucketList();
	}, []);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;

		// 새로운 아이템 생성
		const newItem = { text: text.trim(), completed: false };

		// 아이템 추가
		setItems([...items, newItem]);

		// 폼 데이터 업데이트 (함수형 업데이트 사용)
		setFormData((prevFormData) => ({
			...prevFormData,
			bucketList: [...prevFormData.bucketList, newItem],
		}));

		// 입력 필드 초기화
		setText("");
	};

	const handleDelete = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);

		// 폼 데이터 업데이트
		const updatedFormData = {
			...formData,
			bucketList: updatedItems.map((item) => ({
				text: item.text,
				completed: item.completed,
			})),
		};
		setFormData(updatedFormData);
	};

	const handleToggleComplete = (index) => {
		const updatedItems = [...items];
		updatedItems[index].completed = !updatedItems[index].completed;
		setItems(updatedItems);

		// 폼 데이터 업데이트
		const updatedFormData = {
			...formData,
			bucketList: updatedItems.map((item) => ({
				text: item.text,
				completed: item.completed,
			})),
		};
		setFormData(updatedFormData);
	};

	return (
		<div className="bucketlistContainer">
			<div className="top-bar">
				<button onClick={() => goToMenu()} className="bucketlist-main">
					메인
				</button>
				<SavetheList formData={formData} />
			</div>
			<h2>버킷리스트</h2>
			<form onSubmit={handleSubmit} className="bucket_list_form">
				<input
					type="text"
					className="bucketlist-text"
					value={text}
					onChange={handleChange}
					placeholder="예: 나는 주식 대박나고 싶다."
				/>
				<button type="submit" className="bucketlist-add">
					추가
				</button>
			</form>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<input
							type="checkbox"
							className="completedCheckbox"
							checked={item.completed}
							onChange={() => handleToggleComplete(index)}
						/>
						<span>{item.text}</span>
						<button onClick={() => handleDelete(index)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Checklist;
