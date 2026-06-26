'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { authClient } from '@/lib/auth-client'

export default function Home() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = () => {
		authClient.signUp.email(
			{
				email,
				password,
				name,
			},
			{
				onError: () => {
					window.alert('Error creating user')
				},
				onSuccess: () => {
					window.alert('User created successfully')
				},
			},
		)
	}

	const onLogin = () => {
		authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onError: () => {
					window.alert('Error creating user')
				},
				onSuccess: () => {
					window.alert('User created successfully')
				},
			},
		)
	}

	const { data: session } = authClient.useSession()

	if (session) {
		return (
			<div className="p-4 flex flex-col gap-y-4">
				<p>Logged in as {session.user.email}</p>
				<Button onClick={() => authClient.signOut()}>Sign Out</Button>
			</div>
		)
	}

	return (
		<div>
			{/* Sign in Form */}
			<div className="p-4 flex flex-col gap-y-4">
				<Input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button onClick={onLogin}>Sign In</Button>
			</div>
			{/* Sign Up Form */}
			<div className="p-4 flex flex-col gap-y-4">
				<Input
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button onClick={onSubmit}>Create User</Button>
			</div>
		</div>
	)
}
