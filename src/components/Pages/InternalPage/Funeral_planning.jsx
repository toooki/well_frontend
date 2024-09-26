import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/InternalPage/Funeral_planning.css";

const services = {
	교원라이프: "https://www.kyowonlife.co.kr/",
	대명아임레디: "https://www.daemyungimready.com/main/index.do",
	프리드라이프:
		"https://preed-life.co.kr/?gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqNeqtNnTiXxLuP_lxHBtKahxn13vTmhLOgxO4Mm__QExNVOYIOmPfxoC3r0QAvD_BwE",
	예다함상조: "https://www.yedaham.co.kr/main.do",
	보람상조라이프: "https://www.boramlife.com/",
};

const Funeral_planning = ({ username, password, goToMenu }) => {
	const [organDonation, setOrganDonation] = useState("");
	const [bodyDonation, setBodyDonation] = useState("");
	const [burialOrCremation, setBurialOrCremation] = useState("");
	const [selectedHospital, setSelectedHospital] =
		useState("선택한 병원이 없습니다.");
	const [selectedFuneralHome, setSelectedFuneralHome] =
		useState("선택한 장례식장이 없습니다.");
	const [selectedService, setSelectedService] = useState("");
	const [pronunciationFile, setPronunciationFile] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await axios.get(
					`https://welldying-backend.onrender.com/load/${username}`
				);
				const data = response.data;

				setOrganDonation(data.organDonation || "");
				setBodyDonation(data.bodyDonation || "");
				setBurialOrCremation(data.burialOrCremation || "");
				setSelectedHospital(
					data.hospital
						? `이송희망병원: ${data.hospital}`
						: "선택한 병원이 없습니다."
				);
				setSelectedFuneralHome(
					data.funeralHome
						? `선택한 장례식장: ${data.funeralHome}`
						: "선택한 장례식장이 없습니다."
				);
				setSelectedService(data.funeralServiceAgencies || "");
				setPronunciationFile(
					data.pronunciationName
						? new File([data.pronunciation], data.pronunciationName)
						: null
				);
				setImage(
					data.pronunciation
						? `data:image/jpeg;base64,${data.pronunciation}`
						: null
				);
			} catch (error) {
				console.error("데이터 로드 오류:", error);
			}
		};

		loadData();
		const handleMessage = (event) => {
			if (event.data) {
				if (event.data.hospital) {
					setSelectedHospital(`이송희망병원: ${event.data.hospital}`);
				}
				if (event.data.funeralHome) {
					setSelectedFuneralHome(`선택한 장례식장: ${event.data.funeralHome}`);
				}
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, [username]);

	const handleServiceChange = (e) => {
		setSelectedService(e.target.value);
	};

	const openServiceWebsite = (url) => {
		window.open(url, "_blank");
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setPronunciationFile(file); // Update pronunciationFile with the new file
		}
	};

	const handleSave = async () => {
		if (
			!organDonation ||
			!bodyDonation ||
			!burialOrCremation ||
			!selectedHospital ||
			!selectedService ||
			!selectedFuneralHome
		) {
			alert("모든 필드를 입력해 주세요.");
			return;
		}

		const formData = new FormData();
		formData.append("username", username);
		formData.append("organDonation", organDonation);
		formData.append("bodyDonation", bodyDonation);
		formData.append("burialOrCremation", burialOrCremation);
		formData.append("hospital", selectedHospital.replace("이송희망병원: ", ""));
		formData.append("funeralServiceAgencies", selectedService);
		formData.append(
			"funeralHome",
			selectedFuneralHome.replace("선택한 장례식장: ", "")
		);

		if (pronunciationFile) {
			formData.append("pronunciationName", pronunciationFile.name);
			formData.append("pronunciation", pronunciationFile);
		}

		try {
			await axios.post(
				"https://welldying-backend.onrender.com/save",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			alert("데이터가 성공적으로 저장되었습니다.");
		} catch (error) {
			console.error("저장 오류:", error);
			alert("데이터 저장 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className="Funeral_planning_container">
			<div className="top-bar">
				<button className="Funeral_planning_save" onClick={handleSave}>
					저장
				</button>
				<button className="Funeral_planning_main" onClick={() => goToMenu()}>
					메뉴
				</button>
			</div>
			<h1>장례계획</h1>
			<p>
				장례의사 묻기(장기기증, 시신기증의사 장지(매장or화장)에 관한 희망사항)
			</p>

			<p>장기기증을 할 의향이 있으십니까?</p>
			<div>
				<label>
					<input
						type="radio"
						name="organDonation"
						value="yes"
						checked={organDonation === "yes"}
						onChange={(e) => setOrganDonation(e.target.value)}
					/>
					예
				</label>
				<label>
					<input
						type="radio"
						name="organDonation"
						value="no"
						checked={organDonation === "no"}
						onChange={(e) => setOrganDonation(e.target.value)}
					/>
					아니요
				</label>
			</div>

			<p>시신기증을 할 의향이 있으십니까?</p>
			<div>
				<label>
					<input
						type="radio"
						name="bodyDonation"
						value="yes"
						checked={bodyDonation === "yes"}
						onChange={(e) => setBodyDonation(e.target.value)}
					/>
					예
				</label>
				<label>
					<input
						type="radio"
						name="bodyDonation"
						value="no"
						checked={bodyDonation === "no"}
						onChange={(e) => setBodyDonation(e.target.value)}
					/>
					아니요
				</label>
			</div>

			<p>매장이나 화장 중 어느 것을 선택하시겠습니까?</p>
			<div>
				<label>
					<input
						type="radio"
						name="burialOrCremation"
						value="burial"
						checked={burialOrCremation === "burial"}
						onChange={(e) => setBurialOrCremation(e.target.value)}
					/>
					매장
				</label>
				<label>
					<input
						type="radio"
						name="burialOrCremation"
						value="cremation"
						checked={burialOrCremation === "cremation"}
						onChange={(e) => setBurialOrCremation(e.target.value)}
					/>
					화장
				</label>
			</div>

			<p>이송할 병원 알아두기</p>
			<iframe
				src="/Funeral_planning.html"
				width="100%"
				height="500px"
				title="Searching Hospital"
			></iframe>
			<p>{selectedHospital}</p>

			<p>장례계획 세우기(상조선택)</p>
			<div>
				{Object.keys(services).map((service) => (
					<div key={service}>
						<label>
							<input
								type="radio"
								name="service"
								value={service}
								checked={selectedService === service}
								onChange={handleServiceChange}
							/>
							{service}
						</label>
						<button
							className="Funeral_planning_homepage"
							onClick={() => openServiceWebsite(services[service])}
						>
							홈페이지 방문
						</button>
					</div>
				))}
			</div>

			<p>장례식장 정하기</p>
			<iframe
				src="/Search_funeral.html"
				width="100%"
				height="500px"
				title="Searching Funeral Home"
			></iframe>
			<p>{selectedFuneralHome}</p>

			<p>영정사진 준비하기</p>
			<input
				type="file"
				accept="image/*"
				className="Funeral_planning_select"
				onChange={handleImageChange}
			/>
			{image && (
				<div>
					<h3>업로드된 영정사진:</h3>
					<img
						src={image}
						alt="Uploaded"
						style={{ maxWidth: "100%", maxHeight: "400px" }}
					/>
				</div>
			)}
		</div>
	);
};

export default Funeral_planning;
