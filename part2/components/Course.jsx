/* eslint-disable react/prop-types */
import React from 'react';
const Part = (props) => {
    return(
        <p>{props.part} {props.exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))
    );
}


const Header = ({text}) => {
    return(
        <h1>{text}</h1>
    )
}

const Total = ({parts}) => {
    let num = 0
    parts.map((part) => {
        num += part.exercises
    })
    return(
        <div>
        <p>total of {num} exercises</p>
        </div>
    )
}

const Course = ({course}) => {
    return(
        course.map(course => (
        <div key={course.id}>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
        ))
    )
}

export default Course