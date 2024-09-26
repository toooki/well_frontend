import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/InternalPage/phonenumber.css";

function SavetheList({ formData }) {
	const handleSavemindlist = async () => {
		try {
			console.log(formData);
			const response = await axios.post(
				"https://welldying-backend.onrender.com/savephonenumber",
				formData
			);
			console.log(response.data); // 서버로부터 받은 응답 확인
			alert("연락처가 저장되었습니다.");
		} catch (error) {
			console.error("Error:", error);
			alert("연락처 저장에 실패했습니다.");
		}
	};

	return (
		<button className="Phone_number_save" onClick={handleSavemindlist}>
			저장
		</button>
	);
}

const Number_check = ({ username, password, goToMenu }) => {
	const [items, setItems] = useState([]);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [formData, setFormData] = useState({
		username: username,
		password: password,
		phonename: [], // 이름을 저장할 배열
		phonenumberList: [], // 전화번호를 저장할 배열
	});
	const [error, setError] = useState("");

	const fetchUsermindList = async () => {
		try {
			const response = await axios.get(
				`https://welldying-backend.onrender.com/phonenumberuser?username=${username}`
			);
			const userphonenumberList = response.data;
			setItems(userphonenumberList);
			console.log(items);
		} catch (error) {
			console.error("Error fetching user phonenumber list:", error);
		}
	};

	useEffect(() => {
		fetchUsermindList();
	}, []);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
	};

	const isPhoneNumberValid = (number) => {
		// 전화번호 형식 검증: 010-1234-5678 또는 01012345678
		const phoneNumberPattern =
			/^01[0-9]{1}-[0-9]{4}-[0-9]{4}$|^01[0-9]{1}[0-9]{4}[0-9]{4}$/;
		return phoneNumberPattern.test(number);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name.trim() || !phoneNumber.trim()) return;

		if (!isPhoneNumberValid(phoneNumber)) {
			setError(
				"전화번호 형식이 올바르지 않습니다. 형식: 010-1234-5678 또는 01012345678"
			);
			return;
		} else {
			setError("");
		}

		// 전화번호 형식 변환 (예: 01012345678 -> 010-1234-5678)
		const formattedPhoneNumber = phoneNumber.replace(
			/(\d{3})(\d{4})(\d{4})/,
			"$1-$2-$3"
		);

		// 새로운 아이템 생성
		const newItem = {
			phonename: name.trim(),
			phonenumber: formattedPhoneNumber,
		};

		// 아이템 추가
		setItems([...items, newItem]);

		// 폼 데이터 업데이트
		setFormData((prevFormData) => ({
			...prevFormData,
			phonename: [...prevFormData.phonename, name.trim()],
			phonenumberList: [...prevFormData.phonenumberList, formattedPhoneNumber],
		}));

		// 입력 필드 초기화
		setName("");
		setPhoneNumber("");

		// Log the updated formData
		console.log("Updated formData:", {
			...formData,
			phonename: [...formData.phonename, name.trim()],
			phonenumberList: [...formData.phonenumberList, formattedPhoneNumber],
		});
	};

	const handleDelete = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);

		// 폼 데이터 업데이트
		const updatedFormData = {
			...formData,
			phonename: updatedItems.map((item) => item.phonename),
			phonenumberList: updatedItems.map((item) => item.phonenumber),
		};
		setFormData(updatedFormData);
	};

	return (
		<div className="phoneListContainer">
			<div className="top-bar">
				<button className="Phone_number_main" onClick={() => goToMenu()}>
					메뉴
				</button>
				<SavetheList formData={formData} />
			</div>
			<h1>전화번호 저장</h1>
			<h4>부고 소식을 전할 전화번호를 저장해 놓으세요</h4>
			<form onSubmit={handleSubmit} className="phone_Number_form">
				<input
					type="text"
					className="name_input"
					value={name}
					onChange={handleNameChange}
					placeholder="이름"
				/>
				<input
					type="text"
					className="phone_Number_input"
					value={phoneNumber}
					onChange={handlePhoneNumberChange}
					placeholder="전화번호 (예: 01012345678)"
				/>
				<button type="submit" className="phone_Number_add">
					추가
				</button>
			</form>
			{error && <p className="error">{error}</p>}
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<span>
							{item.phonename} {item.phonenumber}
						</span>
						<button onClick={() => handleDelete(index)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Number_check;
