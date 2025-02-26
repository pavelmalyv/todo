import cl from './LoginSocials.module.scss';

const LoginSocials = () => {
	return (
		<div className={cl['login-socials']}>
			<div className={cl.label}>или</div>
			<ul className={cl.list}>
				<li className={cl.item}>
					<button type="button" className={cl.button}>
						<img
							src="/img/icons/google.svg"
							className={cl['button-icon']}
							width={24}
							height={24}
							alt=""
						/>
						<span>Google</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default LoginSocials;
