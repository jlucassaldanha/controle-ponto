import Header from '@/components/layout/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex flex-grow'>
				{children}
			</main>
		</div>
	)
}