
export class GeneralError extends Error {
	static CRITICAL_ERROR = 'critical';
	static WARNING_ERROR = 'warning';
	code: number;
	level: string;
	httpCodeError: number;

	
	constructor (code: number, message: string, httpCodeError:number = null, level: string = GeneralError.CRITICAL_ERROR){
		super(message);
		this.code = code;
		this.level = level;
		this.httpCodeError = httpCodeError;
	};
}