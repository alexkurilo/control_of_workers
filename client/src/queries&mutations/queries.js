import { gql } from 'apollo-boost/lib/index';

export const getUserRole = gql`
    query compareUserData($email: String, $passwordHash: String) {
        compareUserData(email: $email, passwordHash: $passwordHash) {
            role{
                name
            }
        }
    }
`;

export const allWorkers = gql`
    query getWorkers {
        workers {
            id
            firstName
            secondName
            surName
            gender{
                id
                name
            }
            phone
            date
            salary{
                id
                size
            }
            position{
                id
                name
            }
        }
    }
`;

export const allGenders = gql`
    query getGenders {
        genders {
            id
            name
        }
    }
`;

export const allSalaries = gql`
    query getSalaries {
        salaries {
            id
            size
        }
    }
`;

export const allPositions = gql`
    query getPositions {
        positions {
            id
            name
        }
    }
`;