import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/InternalPage/Mind_checklist.css";

function SavetheList({ formData }) {
	const handleSavemindlist = async () => {
		try {
			console.log(formData);
			const response = await axios.post(
				"https://welldying-backend.onrender.com/savemindlist",
				formData
			);
			console.log(response.data); // 서버로부터 받은 응답 확인
			alert("mind list가 저장되었습니다.");
		} catch (error) {
			console.error("Error:", error);
			alert("mind list 저장에 실패했습니다.");
		}
	};

	return (
		<button className="Mind_checklist_save" onClick={handleSavemindlist}>
			저장
		</button>
	);
}

function MindChecklist({ goToMenu, username, password }) {
	const [items, setItems] = React.useState([]);
	const [text, setText] = React.useState("");
	const [formData, setFormData] = useState({
		username: username,
		password: password,
		mindList: [], // 버킷리스트를 저장할 배열 추가
	});

	const fetchUsermindList = async () => {
		try {
			const response = await axios.get(
				`https://welldying-backend.onrender.com/mindlistuser?username=${username}`
			);
			const usermindList = response.data;
			setItems(usermindList);
			console.log(items);
		} catch (error) {
			console.error("Error fetching user mind list:", error);
		}
	};

	useEffect(() => {
		fetchUsermindList();
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
			mindList: [...prevFormData.mindList, newItem],
		}));

		// 입력 필드 초기화
		setText("");

		// Log the updated formData
		console.log("Updated formData:", {
			...formData,
			mindList: [...formData.mindList, newItem],
		});
	};

	const handleDelete = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);

		// 폼 데이터 업데이트
		const updatedFormData = {
			...formData,
			mindList: updatedItems.map((item) => ({
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
			mindList: updatedItems.map((item) => ({
				text: item.text,
				completed: item.completed,
			})),
		};
		setFormData(updatedFormData);
	};

	return (
		<div className="Mind_checklist_Container">
			<div className="top-bar">
				<button className="Mind_checklist_main" onClick={() => goToMenu()}>
					메뉴
				</button>
				<SavetheList formData={formData} />
			</div>
			<h1>마음의 빚 청산</h1>
			<h4>
				마음에 담겨있는 말, 돌려주지 않은 물건, 하지 못한 말 등을 적어주세요.
			</h4>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="Mind_checklist_set"
					value={text}
					onChange={handleChange}
					placeholder="예: 코딩 어렵다."
				/>
				<button type="submit" className="Mind_checklist_add">
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
						<span>{item.text}</span> {/* 이 부분이 수정됨 */}
						<button onClick={() => handleDelete(index)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default MindChecklist;
