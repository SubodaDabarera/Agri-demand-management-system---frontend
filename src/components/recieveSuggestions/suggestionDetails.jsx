
export default function SuggestionDetails(props) {

    const {suggestion} = props;
    console.log(suggestion);

    return (
        <section aria-labelledby="faq-heading" className="bg-white">
            <div className="max-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="max-w-xl">
                    <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        {suggestion.subject}
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        {suggestion.messageBody}
                    </p>
                </div>
                <br/><br/>
                <div className="max-w-xl">
                    <p className="mt-4 text-base text-gray-500">
                        If pleased with the crop suggestion please{' '}
                        <a href="/farmer/seedRequest" className="font-medium text-indigo-600 hover:text-indigo-500">
                            make a request
                        </a>{' '}
                        and confirm your supply.
                        <br /><br/>
                        For further information on the crop suggestion please contact us on:
                        <p className='text-green-600'>+94123456789</p>
                    </p>
                </div>
            </div>
        </section>
    )
}
