/* eslint-disable react/jsx-key */
import axios from 'axios'
import { useEffect, useState } from 'react';
import { daysBetweenDates } from '../utils/dates';

export default function Home({ characters }) {
console.log(characters);

  const Gap = ({ start, end }) => {
    let daysGap = daysBetweenDates(start, end);
    if (!daysGap) return null
    return (
      <div>
        Gap in CV for {daysGap} days
      </div>
    )
  }
  return (
    <div className="grid  w-[800px] mx-auto gap-3">
      {characters?.map((person) => (

        <div key={person.contact_info.name.given_name} className="grid border pl-4 pb-4   border-black ">
          <h1 className="py-3">hello {person.contact_info.name.given_name + " " + person.contact_info.name.family_name}</h1>
          {person.experience.reverse().map((job, index) => (
            <div key={index}>

              <p>Worked as {job.title}, from {job.start_date} to {job.end_date} in {job.location.municipality}, {job.location.region}, {job.location.country_code} </p>
              <Gap start={job.end_date} end={person.experience[index + 1]?.start_date} />
            </div>

          ))}

        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(req) {

  const { data: characters } = await axios.get(`https://hs-recruiting-test-resume-data.s3.amazonaws.com/allcands-full-api_hub_b1f6-acde48001122.json`);

  return {
    props: {
      characters
    }
  }
}

