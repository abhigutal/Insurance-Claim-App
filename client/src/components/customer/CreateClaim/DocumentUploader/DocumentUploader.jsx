import "./DocumentUploader.css";

const DocumentUploader = ({ register }) => {

    return (

        <div className="document-upload">

            <label>

                Upload Supporting Documents

            </label>

            <input
                type="file"
                multiple
                {...register("documents")}
            />

            <small>

                Accepted formats:
                PDF, JPG, PNG

            </small>

        </div>

    );

};

export default DocumentUploader;