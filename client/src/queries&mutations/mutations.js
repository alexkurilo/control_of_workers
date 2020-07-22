import { gql } from 'apollo-boost/lib/index';

export const deleteWorker = gql`
    mutation workerMutations($id:ID) {
        removeWorker(id:$id) {
            id
        }
    }

`;

export const addNewWorker = gql`
    mutation addNewWorker($firstName:String!, $secondName:String, $surName:String!, $genderId:String!, $phone:String!, $date:String!, $salaryId:String!, $positionId:String!) {
        addWorker(firstName: $firstName, secondName: $secondName, surName: $surName, genderId: $genderId, phone: $phone, date: $date, salaryId: $salaryId, positionId: $positionId) {
            id
        }
    }
`;

export const editWorker = gql`
    mutation editWorker($id:ID, $firstName:String!, $secondName:String, $surName:String!, $genderId:String!, $phone:String!, $date:String!, $salaryId:String!, $positionId:String!) {
        updateWorker(id: $id, firstName: $firstName, secondName: $secondName, surName: $surName, genderId: $genderId, phone: $phone, date: $date, salaryId: $salaryId, positionId: $positionId) {
            id
        }
    }
`;