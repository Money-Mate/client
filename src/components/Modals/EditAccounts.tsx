import React, { useEffect, useState } from "react";
import useAccountStore from "../../context/Accountstore";
import axios from "axios";


interface ModalProps {
name : string;
iban : string;
reference : "name" | "iban";

}

interface AccountModal: React.FC <ModalProps> = ({name, iban, reference}) => {


const Bank = useAccountStore((state) => state.bankAccountData);