'use client';

import clsx from 'clsx';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition, useState } from 'react';
import { Select } from '@mantine/core';
import classes from "./navbar.module.scss";

type Props = {
	data: any;
	defaultValue: string;
	pathname: any;
	translate: any;
};

const combineParams = (pathname:any, params:any) => {
	let str = [];
	for(let key in params) {
		if(params.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
		}
	}
	return pathname + "?" + str.join("&");
}

export default function Lang({ data, defaultValue, pathname, translate }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const params = useParams();
	const translatedData = data.map((lang:any) => {
		return translate('languages.' + lang);
	});

	function onSelectChange(event:any, translatedData:any, data:any, current:any) {
		let index = translatedData.findIndex((el:any) => { return el == event });
		if(index < 0) index = data.findIndex((el:any) => { return el == current });
		const nextLocale = data[index];

		let url = '';
		let splitted = pathname.split('/');
		if(splitted.length > 1) {
			if(data.includes(splitted[1])) {
				splitted = splitted.filter((part:any) => {
					return part !== splitted[1]
				});
			}
			url = '/' + nextLocale + '/' + splitted.join('/');
		}
		else url = pathname + nextLocale;

		startTransition(() => { router.replace(url.replace(/(\/\/)+/g, '/')); });
	}
    
    return (
		<div className={classes.language}>
			<Select
				defaultValue={translatedData[data.findIndex((el:any) => { return el == defaultValue })]}
				disabled={isPending}
				onChange={(e) => onSelectChange(e, translatedData, data, defaultValue)}
				data={translatedData}
			/>
		</div>
    );
};
