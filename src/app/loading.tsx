import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { CircularProgress } from '@mui/material';

export default function Loading() {
	return (
		<div className='w-full h-screen flex flex-col gap-2 justify-center items-center'>
			{/*<div className='animate-pulse'>
				<AccessAlarmIcon sx={{fontSize: 60}}/>
			</div>*/}
			<CircularProgress />
			<span className='text-2xl'>Carregando</span>		
		</div>
	)
}