import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
const USERS_QUERY = gql`
    {
        users {
            data {
                username
            }
        }
        photo(id: 1) {
            url
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation createComment($name: String, $email: String, $body: String) {
        addNote(name: $name, email: $email, body: $body) {
            name
            email
            body
        }
    }
`;

export default function App() {
    const { loading, error, data } = useQuery(USERS_QUERY);
    const [createComment, anyway] = useMutation(CREATE_COMMENT);
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        createComment({ variables: { name: 'wontae', email: 'anyway', body: inputValue } });
        setInputValue('');
    };

    if (loading) return 'Loading...';
    if (error) return `Error!! ${error.message}`;

    return (
        <div>
            <ul>
                {data.users.data.map(({ id, username, email }) => (
                    <li key={id}>
                        <p>name: {username}</p>
                        <p>email: {email}</p>
                    </li>
                ))}
            </ul>
            <div>
                <img src={data.photo.url} alt="placeholder"></img>
            </div>
            <input value={inputValue} onChange={({ target: { value } }) => setInputValue(value)} />
            <button onClick={handleClick}>submit</button>
        </div>
    );
}

// graphQL Get 요청!
// 단순히 AWS Amplify에서 graphQL BE 서버를 구축해서 핸들링하는 거라면 -
