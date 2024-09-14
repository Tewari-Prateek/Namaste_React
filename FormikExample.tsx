import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface CheckboxData {
    category: string;
    items: { label: string; value: string }[];
}

const mockFetchCheckboxData = (): Promise<CheckboxData[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { category: 'Category 1', items: [{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }, { label: 'Option 3', value: 'option3' }, { label: 'Option 4', value: 'option4' }] },
                { category: 'Category 2', items: [{ label: 'Option 5', value: 'option5' }, { label: 'Option 6', value: 'option6' }, { label: 'Option 7', value: 'option7' }, { label: 'Option 8', value: 'option8' }] },
                { category: 'Category 3', items: [{ label: 'Option 9', value: 'option9' }, { label: 'Option 10', value: 'option10' }, { label: 'Option 11', value: 'option11' }, { label: 'Option 12', value: 'option12' }] },
                { category: 'Category 4', items: [{ label: 'Option 13', value: 'option13' }, { label: 'Option 14', value: 'option14' }, { label: 'Option 15', value: 'option15' }, { label: 'Option 16', value: 'option16' }] },
            ]);
        }, 1000);
    });
};

const formStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
};

const dividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '20px 0',
};

const linkStyle: React.CSSProperties = {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
};

const checkboxStyle: React.CSSProperties = {
    margin: '10px 0',
};

const FormikExample = () => {
    const [checkboxData, setCheckboxData] = useState<CheckboxData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        mockFetchCheckboxData().then((data) => {
            setCheckboxData(data);
            setIsLoading(false);
        });
    }, []);

    const initialValues = checkboxData.reduce((acc, category) => {
        category.items.forEach((item) => {
            acc[item.value] = false;
        });
        return acc;
    }, {} as { [key: string]: boolean });

    const handleSelectAll = (setFieldValue: any) => {
        checkboxData.forEach((category) => {
            category.items.forEach((item) => {
                setFieldValue(item.value, true);
            });
        });
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({})} // No specific validation, just tracking checkbox state
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ setFieldValue }) => (
                <Form style={formStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Checkbox Form</h2>
                        <span style={linkStyle} onClick={() => handleSelectAll(setFieldValue)}>
                            Select all checkboxes
                        </span>
                    </div>

                    <div style={dividerStyle}></div>

                    {/* Loop through categories */}
                    {checkboxData.map((category) => (
                        <div key={category.category}>
                            <h3>{category.category}</h3>
                            {category.items.map((item) => (
                                <div key={item.value} style={checkboxStyle}>
                                    <label>
                                        <Field type="checkbox" name={item.value} /> {item.label}
                                    </label>
                                </div>
                            ))}
                            <div style={dividerStyle}></div>
                        </div>
                    ))}

                    <button type="submit" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormikExample;
