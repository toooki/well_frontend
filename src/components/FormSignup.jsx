import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import "../css/auth.css";

const SignupForm = (props) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		phone: "",
		authCode: "",
	});
	const [isSignupCompleted, setIsSignupCompleted] = useState(false);
	const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCheckUsername = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8080/check-username",
				{
					username: formData.username,
				}
			);
			if (response.data.exists) {
				alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.");
				setIsUsernameAvailable(false);
			} else {
				alert("사용 가능한 아이디입니다.");
				setIsUsernameAvailable(true);
			}
		} catch (error) {
			console.error("Error:", error);
			alert("서버 오류가 발생했습니다.");
		}
	};

	const handleRequestVerificationCode = async () => {
		try {
			await axios.post("http://localhost:8080/send", {
				phoneNumber: formData.phone,
			});
			alert("인증 코드를 전송했습니다.");
		} catch (error) {
			console.error("Error:", error);
			alert("인증 코드 요청에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const handleVerifyCode = async () => {
		if (!isUsernameAvailable) {
			alert("중복된 아이디로는 가입할 수 없습니다.");
			return;
		}
		try {
			const response = await axios.post("http://localhost:8080/verify-code", {
				username: formData.username,
				password: formData.password,
				phoneNumber: formData.phone,
				authCode: formData.authCode,
			});
			alert("회원가입이 완료되었습니다.");
			setIsSignupCompleted(true);
		} catch (error) {
			console.error("Error:", error);
			alert("본인인증에 실패했습니다. 다시 시도해주세요.");
		}
	};

	if (isSignupCompleted) {
		props.index("0");
	}

	return (
		<AnimatePresence>
			<motion.div
				className="auth"
				initial={{ opacity: 0, y: 60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h2>회원가입</h2>
				<form>
					<div id="auth">
						<label>
							<p>아이디:</p>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
							/>
							<button type="button" onClick={handleCheckUsername}>
								중복확인
							</button>
						</label>
						<label>
							<p>비밀번호:</p>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
							/>
						</label>
						<label>
							<p>핸드폰 번호:</p>
							<input
								type="text"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
							/>
							<button type="button" onClick={handleRequestVerificationCode}>
								인증요청
							</button>
						</label>
						<label>
							<p>인증코드:</p>
							<input
								type="text"
								name="authCode"
								value={formData.authCode}
								onChange={handleChange}
							/>
						</label>
						<button
							className="red"
							type="button"
							onClick={() => props.index("0")}
						>
							뒤로가기
						</button>
						<button type="button" onClick={handleVerifyCode}>
							가입하기
						</button>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	);
};

export default SignupForm;
