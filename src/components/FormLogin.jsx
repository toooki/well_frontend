import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import "../css/auth.css";
import "frontendsrccssauth.css";

const LoginForm = (props) => {
	//로그인 데이터 수발신 처리
	const [formData, setFormData] = useState({ username: "", password: "" });
	const { handleLoginSuccess } = useContext(AuthContext);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"https://welldying-backend.onrender.com/login",
				{
					username: formData.username,
					password: formData.password,
				}
			);
			console.log(response.data); // 서버로부터 받은 응답 확인
			alert("로그인에 성공했습니다.");
			handleLoginSuccess(formData); // 로그인 성공 시 부모 컴포넌트에 formData 전달
		} catch (error) {
			console.error("Error:", error);
			alert("로그인에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const animationSetting = {
		initial: {
			opacity: 0,
			y: 60,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		transition: {
			duration: 0.5,
		},
	};

	//렌더링 처리
	return (
		<AnimatePresence>
			<motion.div className="auth" {...animationSetting}>
				<div className="tempbox"></div>

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
						<div className="col1">
							<button type="button" onClick={handleLogin}>
								로그인
							</button>
						</div>
						<div className="col2">
							<button type="button" onClick={() => props.index("1")}>
								회원가입
							</button>
							<br />
							<button type="button" onClick={() => props.index("2")}>
								회원탈퇴
							</button>
						</div>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	);
};

export default LoginForm;
